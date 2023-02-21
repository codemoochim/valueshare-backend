const productsForUserServices = require("../services/productsForUserServices");

const getProductLists = async (req, res, next) => {
	try {
		const productData = await productsForUserServices.takeOutProductLists();
		res.json({ data: productData });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getProductLists,
};
