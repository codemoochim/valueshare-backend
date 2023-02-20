const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const userSchema = new Schema(
	{
		shortId,
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
			type: Number,
		},
		address: {
			// 기본배송지?
			type: String,
		},
		orderNumber: {
			// required true 가 아닌데 unique true 일 수가 있나?
			type: Array,
			default: [],
			index: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = userSchema;
// 회원의 주문 검색 시 오더로 쿼리. 비회원은 이메일로 쿼리
