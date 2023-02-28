const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
	{
		email: {
			type: String,
			requried: true,
			index: true,
		},
		password: {
			type: String,
		},
		name: {
			type: String,
		},
		phoneNumber: {
			type: String,
		},
		orderNumber: {
			type: [String],
		},
		shipAdr: {
			type: String,
		},
		shipNote: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = userSchema;
