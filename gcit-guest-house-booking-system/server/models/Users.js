const { DataTypes } = require('sequelize');


const sequelize = require('../config/db'); // shared instance — not created here


const User = sequelize.define('User', {
 name: {
   type: DataTypes.STRING,
   allowNull: false,
 },
 email: {
   type: DataTypes.STRING,
   allowNull: false,
   unique: true,
   validate: { isEmail: true },
 },
 password: {
   type: DataTypes.STRING,
   allowNull: false,
 },
 role: {
   type: DataTypes.ENUM('guest', 'admin'),
   defaultValue: 'guest',
 },
 phone: {
   type: DataTypes.STRING,
   allowNull: true,
 },
}, {
 tableName: 'users',
 timestamps: true, // adds createdAt and updatedAt automatically
} );


module.exports = User;
