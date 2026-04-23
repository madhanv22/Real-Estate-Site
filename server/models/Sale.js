const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    propertyId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }, // The Admin/Company
    agentId: { type: DataTypes.STRING(100), allowNull: true }, // The Agent who sold it
    leadId: { type: DataTypes.INTEGER, allowNull: true }, // The converted lead
    salePrice: { type: DataTypes.STRING, allowNull: false },
    commission: { type: DataTypes.STRING },
    saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    clientName: { type: DataTypes.STRING },
    clientEmail: { type: DataTypes.STRING },
    paymentStatus: { type: DataTypes.ENUM('pending', 'partial', 'completed'), defaultValue: 'pending' },
    paymentId: { type: DataTypes.STRING },
  });
};
