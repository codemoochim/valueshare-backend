const productSrvc = require("../services/productSrvc");

const getProduct = async (req, res, next) => {
	try {
		const { shortId } = req.body;
		const product = await productSrvc.findProduct(shortId);
		res.json({ result: product });
	} catch (err) {
		next(err);
	}
};

const getProductList = async (req, res, next) => {
	try {
		const product = await productSrvc.findProductList();
		res.json({ result: product });
	} catch (err) {
		next(err);
	}
};

const addProduct = async (req, res, next) => {
	try {
		const location = req.files;
		const body = req.body;
		const addedProduct = await productSrvc.createProduct(location, body);
		res.json({ result: addedProduct });
	} catch (err) {
		next(err);
	}
};

const editProduct = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		const productNewData = req.body;
		const productNewImage = req.files;
		const editedProduct = await productSrvc.updateProduct(
			shortId,
			productNewData,
			productNewImage,
		);
		res.json({ result: editedProduct });
	} catch (err) {
		next(err);
	}
};
const removeProduct = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		await productSrvc.deleteProduct(shortId);
		res.json({ message: "상품 삭제가 완료되었습니다." });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getProduct,
	getProductList,
	addProduct,
	editProduct,
	removeProduct,
};
