const { Product, Brand, Category } = require("../db/model/index");

const takeOutProductLists = async (productData) => {
	try {
		const productLists = await Product.find({});
		return productLists;
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = {
	takeOutProductLists,
};
