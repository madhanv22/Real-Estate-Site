const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Testimonial', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING },
    rating: { type: DataTypes.INTEGER, defaultValue: 5 },
    text: { type: DataTypes.TEXT },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  });
};
