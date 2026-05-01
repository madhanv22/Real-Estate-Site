require('dotenv').config();
const { sequelize } = require('./models');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("SUCCESS: Clever Cloud Database is connected and responding!");
    process.exit(0);
  } catch (error) {
    console.error("ERROR: Failed to connect to Clever Cloud:", error.message);
    process.exit(1);
  }
}

testConnection();
