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
		},
		productPrice: {
			type: Number,
			requried: true,
		},
		productCategory: {
			type: String,
			default: "",
			requried: true,
		},
		productBrand: {
			type: String,
			default: "",
			required: true,
		},
		productImage: {
			type: Array,
			// required: true,
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
