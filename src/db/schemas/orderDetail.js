const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const orderDetailSchema = new Schema(
	{
		// 단일 주문건 = 결제 완료 시 나오는 페이지...
		shortId,
		orderId: {
			type: Number,
			required: true,
			index: true,
		},
		products: [
			{
				productName: {
					type: String,
					requried: true,
				},
				productQuantity: {
					type: Number,
					requried: true,
				},
				productPrice: {
					type: Number,
					requried: true,
				},
				productImage: {
					type: Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],
		totalPrice: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = orderDetailSchema;
