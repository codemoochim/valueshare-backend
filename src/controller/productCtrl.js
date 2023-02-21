const productSrvc = require("../services/productSrvc");

const getProductList = async (req, res, next) => {
	try {
		const productList = await productSrvc.findProductList();
		res.json({ result: productList });
	} catch (err) {
		next(err);
	}
};

const addProduct = async (req, res, next) => {
	try {
		const location = req.files;
		const body = req.body;
		const addedProduct = await productSrvc.createProduct(location, body);
		res.json({ data: addedProduct });
	} catch (err) {
		next(err);
	}
};

const getProduct = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const foundProduct = await productSrvc.findProduct(_id);
		res.json({ result: foundProduct });
	} catch (err) {
		next(err);
	}
};

const editProduct = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const body = req.body;
		const location = req.files;
		const editedProduct = await productSrvc.updateProduct(_id, body, location);
		res.json({ result: editedProduct });
	} catch (err) {
		next(err);
	}
};
const removeProduct = async (req, res, next) => {
	try {
		const { _id } = req.params;
		await productSrvc.deleteProduct(_id);
		res.json({ message: "상품 삭제가 완료되었습니다." });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getProductList,
	addProduct,
	getProduct,
	editProduct,
	removeProduct,
};
