const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema({
	categoryName: {
		type: String,
		required: true,
		index: true,
	},
});

module.exports = categorySchema;
