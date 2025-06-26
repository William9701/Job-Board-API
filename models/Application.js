const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Application;