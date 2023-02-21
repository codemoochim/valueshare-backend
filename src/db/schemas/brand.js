const mongoose = require("mongoose");
const { Schema } = mongoose;
const brandSchema = new Schema({
	brandName: {
		type: String,
		required: true,
		index: true,
	},
});

module.exports = brandSchema;
