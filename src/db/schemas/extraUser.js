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
			// ????? order 에 추적하면 address 있음
			type: Number,
		},
		shippingAddress: {
			// ????? extraUserOrder??
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
