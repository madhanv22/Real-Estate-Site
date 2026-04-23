const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Property', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    agentId: { type: DataTypes.STRING(100), allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    beds: { type: DataTypes.INTEGER },
    baths: { type: DataTypes.INTEGER },
    area: { type: DataTypes.STRING },
    img: { type: DataTypes.TEXT },
    tags: { type: DataTypes.JSON, defaultValue: [] },
    highlights: { type: DataTypes.JSON, defaultValue: [] },
    gallery: { type: DataTypes.JSON, defaultValue: [] },
    priceHistory: { type: DataTypes.JSON, defaultValue: [] },
    amenities: { type: DataTypes.JSON, defaultValue: [] },
    nearby: { type: DataTypes.JSON, defaultValue: [] },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  });
};
