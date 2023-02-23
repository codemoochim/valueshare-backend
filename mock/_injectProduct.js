// const bag = require("./mock/bag");
// const bottom = require("./mock/bottom");
const bottom2 = require("./mock/bottom2");
// const dress = require("./mock/dress");
// const outer = require("./mock/outer");
// const top = require("./mock/top");
const twoPiece = require("./mock/twoPiece");

const { Brand, Product, Category } = require("../src/db/model/index");

const implicit = {
	5562: {
		goods_name: "motor city bag khaki",
		brand_name: "Balenciaga",
		brand_num: 569,
		imgs: "https://upload.closetshare.com/StaticContent/shop/data/upload/goods/scaled-800-[1612235046394]ba-00092_front.jpg",
		type_str: "\uac00\ubc29",
		category_name: "\ud1a0\ud2b8",
		sub_category_name: "\ud1a0\ud2b8",
		hashtags: ["\uc77c\uc0c1"],
		color: "Khaki",
		material: "\uc1a1\uc544\uc9c0 \uac00\uc8fd",
	},
};
const setSrvc = async () => {
	try {
		const putBag = (type) => {
			const result = Object.values(type).map((i) => {
				return {
					productBrand: i.brand_name,
					productCategory: "twoPiece",
					productTitle: i.goods_name,
					productImage: i.imgs,
				};
			});
			return result;
		};
		const arrBag = putBag(implicit);

		arrBag.forEach(async (i) => {
			const setBrand = await Brand.findOne({
				brandName: i.productBrand,
			});
			const setCate = await Category.findOne({
				categoryName: i.productCategory,
			});
			const sett = await Product.create({
				productBrand: setBrand._id,
				productCategory: setCate._id,
				productTitle: i.productTitle,
				productImage: i.productImage,
			});
			const setinit = await Product.findById(sett._id)
				.populate("productBrand")
				.populate("productCategory");
		});
	} catch (err) {
		console.error(err);
	}
};

module.exports = { setSrvc };
