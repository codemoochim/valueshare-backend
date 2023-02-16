const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const adminSchema = new Schema(
	{
		shortId,
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			requried: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = adminSchema;
