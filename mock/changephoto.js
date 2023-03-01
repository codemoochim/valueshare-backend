const urlData = require("./urlDatas");

const { Brand, Product, Category } = require("../src/db/model/index");
const bagSource = {
	194499: {
		goods_name: "30 MONTAIGNE REVERSIBLE BELT",
		brand_name: "Dior",
		brand_num: 0,
		imgs: [
			"https://media.dior.com/couture/ecommerce/media/catalog/product/0/X/1674848715_B0179UWGA_M118_E10_GH.jpg?imwidth=430",
			"https://media.dior.com/couture/ecommerce/media/catalog/product/0/X/1674848715_B0179UWGA_M118_E01_ZHC.jpg?imwidth=870",
			"https://media.dior.com/couture/ecommerce/media/catalog/product/0/X/1674848715_B0179UWGA_M118_E03_GH.jpg?imwidth=430",
			"https://media.dior.com/couture/ecommerce/media/catalog/product/0/X/1674848715_B0179UWGA_M118_E07_GH.jpg?imwidth=430",
		],
		type_str: "\uc758\ub958",
		category_name: "\ud22c\ud53c\uc2a4",
		sub_category_name: "\ud22c\ud53c\uc2a4",
		hashtags: ["\uc77c\uc0c1", "\uc704\ucf04\ub4dc"],
		color: "Black",
		material: "\uba74",
	},
};
const imageData = urlData.accessories;
//  = [
// 	"https://valueshare3.s3.ap-northeast-2.amazonaws.com/images/bag00001.jpg",
// 	"https://valueshare3.s3.ap-northeast-2.amazonaws.com/images/bag00002.jpg",
// 	"https://valueshare3.s3.ap-northeast-2.amazonaws.com/images/bag00003.jpg",
// 	"https://valueshare3.s3.ap-northeast-2.amazonaws.com/images/bag00004.jpg",
// 	"https://valueshare3.s3.ap-northeast-2.amazonaws.com/images/bag00005.jpg",
// ];
// 다큐먼트 개수만큼 돌려
// 난수를 사용해 28개

// 데이터 주입시킴
const setSrvc = async () => {
	try {
		// const result = await Category.find({});
		// const putBag = (type) => {
		// 	const result = Object.values(type).map((i) => {
		// 		return {
		// 			productCategory: "accessories",
		// 			productImage: i.imgs,
		// 		};
		// 	});
		// 	return result;
		// };
		// const arrBag = putBag(type);
		// arrBag.forEach(async (i) => {
		// 	const sett = await Product.create({
		// 		productImage: i.productImage,
		// 	});
		// 	const setinit = await Product.findOneAndUpdate(sett._id);
		// 	return setinit;
		// });

		// const imageUpdate = await Product.find(
		// 	{ productCategory: "63f254944a730cb5c34c89eb" },
		// 	// {
		// 	// 	$push: {
		// 	// 		productImage:
		// 	// 			"https://valueshare3.s3.ap-northeast-2.amazonaws.com/images/bag00001.jpg",
		// 	// 	},
		// 	// },
		// );
		console.log("실행");
		// const random = Math.floor(Math.random() * imageData.length);
		// const result = await Product.updateMany(
		// 	{ productCategory: "63f254944a730cb5c34c89eb" },
		// 	{
		// 		$set: {
		// 			productImage: [
		// 				// imageData[Math.floor(Math.random() * imageData.length)],
		// 				imageData[Math.floor(Math.random() * imageData.length)],
		// 			],
		// 		},
		// 	},
		// );
		// etc 63f5dc37b85dcd942f85eb00
		// acc 63f254944a730cb5c34c89f1
		for (let i = 0; i < imageData.length; i++) {
			const result = await Product.create({
				productTitle: `luxury accessories no.${i}`,
				prodcutStock: 10,
				productCategory: "63f254944a730cb5c34c89f1",
				productBrand: "63f5dc37b85dcd942f85eb00",
				productImage: imageData[i],
				productDescription:
					"Inspired by the hallmark namesake bag, the 30 Montaigne belt is offered in a reversible variation, thanks to its swivel feature. Crafted in latte smooth calfskin on one side and beige on the other, it is embellished with the iconic shiny gold-finish metal CD buckle. The design also features two removable loops that can be worn in an either tonal or contrasting fashion. The timeless accessory elegantly highlights the waist and will coordinate well with jeans, a skirt or a dress.",
				productDetail: `
					30 Montaigne CD buckle
					Shiny gold-finish metal detailing
					Two removable loops
					100% calfskin
					Made in Italy
					Width: 35 mm / 1.5 inches
					For more information, please view the size guide`,
			});
			const result2 = await Product.findById(result._id)
				.populate("productBrand")
				.populate("productCategory");
		}
		// const products = await Product.find({
		// 	createdAt: { $lte: "2023-02-20T02:25:43.436+00:00" },
		// });
		// for (let i = 0; i < 4; i++) {
		// 	const randomIndex = Math.floor(Math.random() * imageData.length);
		// 	const randomImage = imageData[randomIndex];

		// 	const result = await Product.updateMany(
		// 		{
		// 			createdAt: {
		// 				$gte: "2023-02-20T02:33:57.373+00:00",
		// 				$lte: "2023-02-20T02:33:57.932+00:00",
		// 			},
		// 		},
		// 		{ $push: { productImage: randomImage } },
		// 		{ new: true },
		// 	);
		// 	console.log(i);
		// }

		// 	{
		// 		$set: {
		// 			productImage: [
		// 				// imageData[Math.floor(Math.random() * imageData.length)],
		// 				imageData[Math.floor(Math.random() * imageData.length)],
		// 			],
		// 		},
		// 	},
		// );

		// const products = await Product.find({
		// 	createdAt: { $lte: "2023-02-20T02:25:43.436+00:00" },
		// });

		console.log(result);
		// for (const product of products) {
		// 	const randomIndex = Math.floor(Math.random() * imageData.length);
		// 	const randomImage = imageData[randomIndex];
		// 	await Product.updateOne(
		// 		{ _id: product._id },
		// 		{ $set: { productImage: [randomImage] } },
		// 	);
		// }

		// const products = await Product.find({
		// 	productCategory: "63f254944a730cb5c34c89ee",
		// });
		// // console.log(products);
		// for (const product of products) {
		// 	const randomIndex = Math.floor(Math.random() * imageData.length);
		// 	const randomImage = imageData[randomIndex];
		// 	await Product.updateOne(
		// 		{ _id: product._id },
		// 		{ $set: { productImage: [randomImage] } },
		// 	);
		// }

		console.log("종료");
		return 3;

		// const count = await Product.countDocuments({
		// 	productCategory: "63f254944a730cb5c34c89ee",
		// });
		// console.log(`There are ${count} admin users`);
	} catch (err) {
		console.error(err);
	}
};

module.exports = { setSrvc };

// https://upload.closetshare.com/StaticContent/shop/data/upload/goods/2017/10/scaled-800-Louis-Vuitton-speedy-30-multi-black1_side.jpg
