'use strict';

const houseModel = (sequelize, DataTypes) => sequelize.define('Household', {
	seller: { type: DataTypes.STRING, required: true },
	name: { type: DataTypes.STRING, required: true },
	quantity: { type: DataTypes.INTEGER, required: true },
	category: { type: DataTypes.STRING, required: true },
	price: { type: DataTypes.INTEGER, required: true },
	location: { type: DataTypes.STRING, required: true },
	condition: { type: DataTypes.STRING, require: true }
});

module.exports = houseModel;