const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const extraUserSchema = new Schema(
	{
		shortId,
		email: {
			type: String,
			requried: true,
		},
		orderNumber: {
			type: Number,
		},
		shippingAddress: {
			type: String,
		},
		name: {
			type: String,
		},
		phone: {
			type: Number,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = extraUserSchema;
