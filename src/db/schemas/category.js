const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const categorySchema = new Schema({
	shortId,
	categoryName: {
		type: String,
		required: true,
		index: true,
	},
});

module.exports = categorySchema;
