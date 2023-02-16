const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const orderProductSchema = new Schema(
	{
		shortId,
		orderId: {
			type: Schema.Types.ObjectId,
			ref: "Order",
		},
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
		count: {
			type: Number,
			requried: true,
		},
		productName: {
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
		// image: {
		// 	type: Schema.Types.ObjectId,
		// 	ref: "Product",
		// },
	},
	{
		timestamps: true,
	},
);

module.exports = orderProductSchema;
