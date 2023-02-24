const { Brand, Product } = require("../db/model");

const getBrandId = async (brand) => {
	if (!Array.isArray(brand)) {
		brand = [brand];
	}
	// Array.isArray(brand) ? brand : [brand];
	const brandId = await Promise.all(
		brand.map(async (brand) => {
			const _id = await Brand.findOne(
				{ brandName: brand },
				// { _id: 1, brandName: 0, shortId: 0 },
			);
			return _id._id;
		}),
	);
	return brandId;
};
const checkedBrandProduct = async (brandId) => {
	const result = await Product.find({
		productBrand: { $in: [""] },
	})
		.populate("productBrand")
		.populate("productCategory")
		.limit(10);
	return result;
};

const findAllProduct = async () => {
	const allProduct = await Product.find({})
		.populate("productCategory")
		.populate("productBrand")
		.limit(10);
	return allProduct;
};

module.exports = { getBrandId, findAllProduct, checkedBrandProduct };
