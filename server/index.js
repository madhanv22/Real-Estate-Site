require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/public'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/superadmin', require('./routes/superadmin'));

app.get('/api/health', (_, res) => res.json({ status: 'ok', time: new Date() }));

// Global Error Logger
app.use((err, req, res, next) => {
  console.error('❌ SERVER ERROR:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Root route
app.get('/', (req, res) => res.send('PropFunnel API is running...'));

// Startup Logic
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // Only sync in development - in production tables already exist
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();
      console.log('✅ Database synced');
    }

    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    }
  } catch (err) {
    console.error('❌ Database initialization error:', err.message);
  }
};

startServer();

module.exports = app;
