const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const GuestHouse = sequelize.define('GuestHouse', {
name: {
 type: DataTypes.STRING,
 allowNull: false,
},
description: {
 type: DataTypes.TEXT,
 allowNull: true,
},
address: {
 type: DataTypes.STRING,
 allowNull: false,
},
phone: {
 type: DataTypes.STRING,
 allowNull: true,
},
email: {
 type: DataTypes.STRING,
 allowNull: true,
 validate: { isEmail: true },
},
}, {
tableName: 'guest_houses',
timestamps: true,
});
module.exports = GuestHouse;