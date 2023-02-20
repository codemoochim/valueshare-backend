const bag = require("../../mock/bag");
const bottom = require("../../mock/bottom");
const bottom2 = require("../../mock/bottom2");
const dress = require("../../mock/dress");
const outer = require("../../mock/outer");
const top = require("../../mock/top");
const twoPiece = require("../../mock/twoPiece");

const { Brand, Product, Category } = require("../db/model/index");
const bagSource = {
	194677: {
		imgs_s: [
			"https://upload.closetshare.com/StaticContent/shop/data/upload/goods/scaled-400-[1675071790790]b-25641_front_2000px_01.jpg",
			"https://upload.closetshare.com/StaticContent/shop/data/upload/goods/scaled-400-[1675071790790]b-25641_front_2000px_01.jpg",
			"https://upload.closetshare.com/StaticContent/shop/data/upload/goods/scaled-400-[1675071790790]b-25641_detail.jpg",
			"https://upload.closetshare.com/StaticContent/shop/data/upload/goods/scaled-400-[1675071790790]b-25641_back_2000px_01.jpg",
		],
		goods_name: "basic pattern wrap-skirt chocolate",
		brand_name: "Somikyung",
		brand_num: 3050,
		imgs_l: [
			"https://upload.closetshare.com/StaticContent/shop/data/upload/goods/scaled-800-[1675071790790]b-25641_front_2000px_01.jpg",
			"https://upload.closetshare.com/StaticContent/shop/data/upload/goods/scaled-800-[1675071790790]b-25641_detail.jpg",
			"https://upload.closetshare.com/StaticContent/shop/data/upload/goods/scaled-800-[1675071790790]b-25641_back_2000px_01.jpg",
		],
		type_str: "\uc758\ub958",
		category_name: "\ud558\uc758",
		sub_category_name: "\uc2a4\ucee4\ud2b8",
		hashtags: [
			"\ubb34\uc9c0",
			"\ud50c\ub808\uc5b4",
			"\uc20f",
			"\ub8e8\uc988\ud54f",
			"\uc77c\uc0c1",
			"\ud734\uac00",
		],
		color: "Chocolate",
		material: "\uba74",
	},
};

// 데이터 주입시킴
const setSrvc = async () => {
	try {
		const putBag = (type) => {
			const result = Object.values(type).map((i) => {
				return {
					productBrand: i.brand_name,
					productCategory: "Two Piece",
					productTitle: i.goods_name,
					productImage: i.imgs,
				};
			});
			return result;
		};
		const arrBag = putBag(bagSource);
		console.log(arrBag);

		// arrBag.forEach(async (i) => {
		// 	const setBrand = await Brand.findOne({
		// 		brandName: i.productBrand,
		// 	});
		// 	const setCate = await Category.findOne({
		// 		categoryName: i.productCategory,
		// 	});
		// 	const sett = await Product.create({
		// 		productBrand: setBrand._id,
		// 		productCategory: setCate._id,
		// 		productTitle: i.productTitle,
		// 		productImage: i.productImage,
		// 	});
		// 	const setinit = await Product.findById(sett._id)
		// 		.populate("productBrand")
		// 		.populate("productCategory");
		// });
	} catch (err) {
		console.error(err);
	}
};
// bag 1004개, bottom 1006, dress 1006, outer 1005

// 1000개 씩 업로드 이미지 1개뿐

module.exports = { setSrvc };
