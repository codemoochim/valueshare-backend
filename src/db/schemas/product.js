const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
	{
		productTitle: {
			type: String,
			required: true,
		},
		productStock: {
			type: Number,
			requried: true,
			default: 10,
		},
		productPrice: {
			type: Number,
			requried: true,
			default: () => Math.round(Math.random().toFixed(2) * 200000),
		},
		productCategory: {
			type: Schema.Types.ObjectId,
			ref: "Category",
		},
		productBrand: {
			type: Schema.Types.ObjectId,
			ref: "Brand",
		},
		productImage: {
			type: Array,
			required: true,
		},
		productDescription: {
			type: String,
			default: "",
			required: true,
		},
		productDetail: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	},
);

module.exports = productSchema;
