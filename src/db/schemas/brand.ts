import mongoose from "mongoose";

const { Schema } = mongoose;
const brandSchema = new Schema({
	brandName: {
		type: String,
		required: true,
		index: true,
	},
});

export default brandSchema;
