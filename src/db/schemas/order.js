const mongoose = require("mongoose");
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
					// 이미지 링크,
					type: Array,
					default: ["이미지 정보가 없습니다"],
				},
			},
		],
		totalPrice: {
			type: Number,
			required: true,
		},
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
		cancelNote: String, // 취소 메모
	},
	{
		timestamps: true,
	},
);

module.exports = orderSchema;

// 주문 예시
// {"email": "happy@happy.com",
// 		"name": "해피데이",
// 		"phone": "010-3232-5252",
// 		"products": [
// 			{
// 				"productName": "츄르1",
// 				"productQuantity": 2,
// 				"productPrice": 3000,
// 				"productImage": ["고양이밥"]
// 			},
//             {
// 				"productName": "츄르 디럭스 에디션",
// 				"productQuantity": 5,
// 				"productPrice": 12000,
// 				"productImage": ["고양이간식"]
// 			},
//             {
// 				"productName": "츄르 뷔페식",
// 				"productQuantity": 2,
// 				"productPrice": 7000,
// 				"productImage": ["고양이사료"]
// 			}
// 		],
// 		"totalPrice": 80000,
// 		"shipAdr":"서울시 묘동"
// }
