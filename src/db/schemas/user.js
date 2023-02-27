const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuid } = require("uuid");
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
		phone: {
			type: String,
		},
		address: {
			type: String,
		},
		orderNumber: {
			type: [String],
		},
	},
	{
		timestamps: true,
	},
);

module.exports = userSchema;
// 회원의 주문 검색 시 오더로 쿼리. 비회원은 이메일로 쿼리
