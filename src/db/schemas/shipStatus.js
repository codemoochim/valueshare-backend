const mongoose = require("mongoose");
const { Schema } = mongoose;
const shipStatusSchema = new Schema({
	shipStatus: {
		type: Schema.Types.ObjectId,
		ref: "Order",
	},
});

module.exports = shipStatusSchema;
