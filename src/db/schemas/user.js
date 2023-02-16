const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const userSchema = new Schema(
	{
		shortId,
		email: {
			type: String,
			requried: true,
		},
		password: {
			type: String,
			requried: true,
		},
		token: {
			type: String,
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
		birthday: {
			type: String,
		},
		gender: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = userSchema;
