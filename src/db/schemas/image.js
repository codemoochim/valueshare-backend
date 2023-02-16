const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const imageSchema = new Schema(
	{
		shortId,
		image: {
			type: Array,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = imageSchema;
