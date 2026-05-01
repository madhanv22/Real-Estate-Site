const { Sequelize } = require('sequelize');
require('mysql2'); // required: Vercel's bundler needs a static require to include mysql2
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'propfunnel',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
      connectTimeout: 10000,
    },
    pool: { max: 2, min: 0, acquire: 10000, idle: 5000 },
  }
);

const User = require('./User')(sequelize);
const Agent = require('./Agent')(sequelize);
const Property = require('./Property')(sequelize);
const Lead = require('./Lead')(sequelize);
const Sale = require('./Sale')(sequelize);
const Testimonial = require('./Testimonial')(sequelize);

// Associations
User.hasMany(Agent, { foreignKey: 'userId', onDelete: 'CASCADE' });
Agent.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Property, { foreignKey: 'userId', onDelete: 'CASCADE' });
Property.belongsTo(User, { foreignKey: 'userId' });

Agent.hasMany(Property, { foreignKey: 'agentId', sourceKey: 'id', onDelete: 'SET NULL' });
Property.belongsTo(Agent, { foreignKey: 'agentId', targetKey: 'id' });

Property.hasMany(Lead, { foreignKey: 'propertyId', onDelete: 'SET NULL' });
Lead.belongsTo(Property, { foreignKey: 'propertyId' });

User.hasMany(Lead, { foreignKey: 'userId', onDelete: 'CASCADE' });
Lead.belongsTo(User, { foreignKey: 'userId' });

Property.hasOne(Sale, { foreignKey: 'propertyId' });
Sale.belongsTo(Property, { foreignKey: 'propertyId' });

User.hasMany(Sale, { foreignKey: 'userId', onDelete: 'CASCADE' });
Sale.belongsTo(User, { foreignKey: 'userId' });

Agent.hasMany(Sale, { foreignKey: 'agentId', sourceKey: 'id' });
Sale.belongsTo(Agent, { foreignKey: 'agentId', targetKey: 'id' });

module.exports = { sequelize, User, Agent, Property, Lead, Sale, Testimonial };
