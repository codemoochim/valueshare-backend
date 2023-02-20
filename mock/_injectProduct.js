const bag = require("./mock/bag");
const bottom = require("./mock/bottom");
const bottom2 = require("./mock/bottom2");
const dress = require("./mock/dress");
const outer = require("./mock/outer");
const top = require("./mock/top");
const twoPiece = require("./mock/twoPiece");

const { Brand, Product, Category } = require("../src/db/model/index");

const setSrvc = async () => {
	try {
		const putBag = (type) => {
			const result = Object.values(type).map((i) => {
				return {
					productBrand: i.brand_name,
					productCategory: "Top",
					productTitle: i.goods_name,
					productImage: i.imgs,
				};
			});
			return result;
		};
		const arrBag = putBag(top);

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

// module.exports = { setSrvc };
