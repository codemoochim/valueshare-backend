const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const productSchema = new Schema(
	{
		shortId,
		productTitle: {
			type: String,
			required: true,
		},
		productStock: {
			type: Number,
			requried: true,
			default: 0,
		},
		productPrice: {
			type: Number,
			requried: true,
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
		},
	},
	{
		timestamps: true,
	},
);

module.exports = productSchema;
