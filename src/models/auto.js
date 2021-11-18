'use strict';

const autoModel = (sequelize, DataTypes) => sequelize.define('Auto', {
	seller: { type: DataTypes.STRING, required: true },
	name: { type: DataTypes.STRING, required: true },
	quantity: { type: DataTypes.INTEGER, required: true },
	category: { type: DataTypes.STRING, required: true },
	price: { type: DataTypes.INTEGER, required: true },
	location: { type: DataTypes.STRING, required: true },
	condition: { type: DataTypes.STRING, require: true }
});

module.exports = autoModel;
