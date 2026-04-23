const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Agent', {
    id: { type: DataTypes.STRING(100), primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING },
    experience: { type: DataTypes.STRING },
    deals: { type: DataTypes.STRING },
    avatar: { type: DataTypes.TEXT },
    tagline: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
  });
};
