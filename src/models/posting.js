'use strict';

const postingModel = (sequelize, DataTypes) => sequelize.define('Posting', {
	name: { type: DataTypes.STRING, required: true },
	quantity: { type: DataTypes.STRING, required: true },
	category: { type: DataTypes.STRING, required: true },
	price: { type: DataTypes.INTEGER, required: true },
	location: { type: DataTypes.STRING, required: true },
	condition: { type: DataTypes.STRING, require: true }
});

module.exports = postingModel;
