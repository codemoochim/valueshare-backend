const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const brandSchema = new Schema(
	{
		shortId,
		name: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = brandSchema;
