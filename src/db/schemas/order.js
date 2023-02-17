const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const productSchema = require("./product.js");
const orderSchema = new Schema(
	{
		shortId,
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		extraUserId: {
			type: Schema.Types.ObjectId,
			ref: "ExtraUser",
		},
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
		shippingAddress: {
			type: String,
			reuqried: true,
		},
		shippingStatus: {
			type: String,
			reuqried: true,
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

module.exports = orderSchema;
