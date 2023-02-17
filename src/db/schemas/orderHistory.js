const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const orderHistorySchema = new Schema(
	{
		// 전체 주문 목록
		shortId,
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		orderId: {
			type: Number,
			required: true,
		},
		shippingAddress: {
			type: String,
			reuqried: true,
		},
		shippingStatus: {
			type: String,
			reuqried: true,
		},
		image: {
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
	},
	{
		timestamps: true,
	},
);

module.exports = orderHistorySchema;
