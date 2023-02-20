const mongoose = require("mongoose");
const { Schema } = mongoose;
const shortId = require("../shortId.js");
const orderDetailSchema = new Schema(
	{
		shortId,
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			requreid: true,
		},
		orderNumber: {
			// 왜 uuid v4 를 써야하는지 이유를 말할 수 있다.
			// version 에 대한 이유 또한.
			// 주문번호 생성 고민..
			type: Number,
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
		orderStatus: {
			// 주문완료, 배송준비중, 배송중, 배송완료, 주문취소
			type: String,
			requird: true,
		},
		shippingAddress: {
			// 배송지
			type: String,
			required: true,
		},
		shippingNote: String, // 배송 메모
	},
	{
		timestamps: true,
	},
);

module.exports = orderDetailSchema;
