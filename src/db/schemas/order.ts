import mongoose from "mongoose";

const { Schema } = mongoose;
const orderSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			requreid: true,
		},
		orderNumber: {
			type: String,
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
		phoneNumber: {
			// 주문자, 선물하기 연락처 다를 가능성
			type: String,
			// required: true,
		},
		products: [
			{
				productTitle: {
					// 상품명 스냅샷
					type: String,
				},
				productBrand: {
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
					// 이미지 링크,
					type: Array,
				},
			},
		],
		totalPrice: {
			type: String,
			required: true,
		},
		shipStatus: {
			// 주문 접수, 주문 완료, 배송 준비중, 배송중, 배송 완료, 주문 취소
			type: String,
			requird: true,
		},
		shipAdr: {
			// 배송지
			type: String,
			required: true,
		},
		shipNote: String, // 배송 메모
		cancelNote: String, // 취소 메모
	},
	{
		timestamps: true,
	},
);

export default orderSchema;
