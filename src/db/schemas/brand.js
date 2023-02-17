const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const brandSchema = new Schema({
	shortId,
	brandName: {
		type: String,
		required: true,
		index: true,
	},
});

module.exports = brandSchema;
