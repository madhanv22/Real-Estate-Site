const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Lead', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    propertyId: { type: DataTypes.INTEGER, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, allowNull: false },
    budget: { type: DataTypes.STRING },
    propertyType: { type: DataTypes.STRING },
    timeline: { type: DataTypes.STRING },
    loanRequired: { type: DataTypes.STRING },
    visitDate: { type: DataTypes.STRING },
    visitTime: { type: DataTypes.STRING },
    leadType: {
      type: DataTypes.ENUM('inquiry', 'visit'),
      defaultValue: 'inquiry',
    },
    status: {
      type: DataTypes.ENUM('new', 'contacted', 'converted', 'lost'),
      defaultValue: 'new',
    },
  });
};
