const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

if (sequelize){
    console.log('Database connection established successfully.');
}

module.exports = sequelize;