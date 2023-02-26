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

module.exports = orderSchema;

// 주문 예시 2
// {"email": "chulsoo@chulsoo.com",
// 		"name": "김철수",
// 		"phone": "010-0000-0000",
// 		"products": [
// 			{
// 				"productTitle": "츄르1",
// 				"productQuantity": 2,
// 				"productPrice": 3000,
// 				"productImage": ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.costco.co.kr%2FBabyKidsToysPets%2FPet-Supplies%2FCat-Food%2FInaba-Ciao-Churu-Cat-Treats-Variety-Pack-14g-x-90%2Fp%2F652048&psig=AOvVaw01-NzIk5BMtDT4P36RzJqi&ust=1677203818427000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCODynKHFqv0CFQAAAAAdAAAAABAD", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.lotteon.com%2Fm%2Fproduct%2FPD85348%3FsitmNo%3DLD663414163_0%26dp_infw_cd%3DSSTLD476109&psig=AOvVaw01-NzIk5BMtDT4P36RzJqi&ust=1677203818427000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCODynKHFqv0CFQAAAAAdAAAAABAH"]
// 			},
//             {
// 				"productTitle": "츄르 디럭스 에디션",
// 				"productQuantity": 5,
// 				"productPrice": 12000,
// 				"productImage": ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hani.co.kr%2Farti%2FPRINT%2F890019.html&psig=AOvVaw01-NzIk5BMtDT4P36RzJqi&ust=1677203818427000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCODynKHFqv0CFQAAAAAdAAAAABAP"]
// 			},
//             {
// 				"productTitle": "츄르 뷔페식",
// 				"productQuantity": 2,
// 				"productPrice": 7000,
// 				"productImage": ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.post.naver.com%2Fviewer%2FpostView.naver%3FvolumeNo%3D30309855%26memberNo%3D2247263&psig=AOvVaw01-NzIk5BMtDT4P36RzJqi&ust=1677203818427000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCODynKHFqv0CFQAAAAAdAAAAABAX", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbbosiraegi.kr%2Fproduct%2F%25EB%25BD%2580%25EC%258B%259C%25EB%259E%2598%25EA%25B8%25B0-%25EA%25B3%25A0%25EC%2596%2591%25EC%259D%25B4-%25EC%25A0%2580%25EC%2597%25BC-%25EA%25B0%2584%25EC%258B%259D-%25EC%25B4%2589%25EC%25B4%2589%25EC%25B8%2584%25EB%25A5%25B4-1%25ED%258C%25A9-5%25EA%25B0%259C%25EC%259E%2585%2F63%2F&psig=AOvVaw01-NzIk5BMtDT4P36RzJqi&ust=1677203818427000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCODynKHFqv0CFQAAAAAdAAAAABAf", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.animalplanet.co.kr%2Fcontents%2F%3FartNo%3D3125&psig=AOvVaw01-NzIk5BMtDT4P36RzJqi&ust=1677203818427000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCODynKHFqv0CFQAAAAAdAAAAABAn", "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.gjdream.com%2Fnews%2FarticleView.html%3Fidxno%3D438433&psig=AOvVaw3hLlZE5IAlrOlcPzgwRUko&ust=1677203950666000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCq79_Fqv0CFQAAAAAdAAAAABAI"]
// 			}
// 		],
// 		"totalPrice": 80000,
// 		"shipAdr":"서울시 묘동",
//         "shipNote": "배송 빨리줘잉~"
// }
