const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuid } = require("uuid");
const orderDetailSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			requreid: true,
		},
		orderNumber: {
			type: [String],
			required: true,
			index: true,
		},
		email: {
			// 이메일 비회원 식별 고유값
			type: String,
			required: true,
		},
		name: {
			// 주문인, 수령인 다를 가능성
			type: String,
			required: true,
		},
		phone: {
			// 주문자, 선물하기 연락처 다를 가능성
			type: String,
			required: true,
		},
		products: [
			{
				productName: {
					// 상품명 스냅샷
					type: String,
					requried: true,
				},
				productQuantity: {
					// 구매수량 스냅샷
					type: Number,
					requried: true,
				},
				productPrice: {
					// 가격 스냅샷
					type: Number,
					requried: true,
				},
				productImage: {
					// 이미지 링크
					type: Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],
		shipStatus: {
			// 주문완료, 배송준비중, 배송중, 배송완료, 주문취소
			type: String,
			requird: true,
		},
		shipAdr: {
			// 배송지
			type: String,
			required: true,
		},
		shipNote: String, // 배송 메모
	},
	{
		timestamps: true,
	},
);

module.exports = orderDetailSchema;
