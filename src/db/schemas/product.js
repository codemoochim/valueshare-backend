const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const productSchema = new Schema(
	{
		shortId,
		title: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			requried: true,
		},
		price: {
			type: Number,
			requried: true,
		},
		category: {
			type: String,
			requried: true,
		},
		brand: {
			type: String,
			required: true,
		},
		image: {
			type: Array,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	},
);

module.exports = productSchema;
