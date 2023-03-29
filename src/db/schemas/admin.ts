import mongoose from "mongoose";

const { Schema } = mongoose;
const adminSchema = new Schema(
	{
		email: {
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

export default adminSchema;
