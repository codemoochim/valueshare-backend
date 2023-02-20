// const productSrvc = require("../services/productSrvc");
const userSrvc = require("../services/userSrvc");

const getProductList = async (req, res, next) => {
	try {
		const productList = await productSrvc.findProductList();
		res.json({ result: productList });
	} catch (err) {
		next(err);
	}
};

const addUser = async (req, res, next) => {
	try {
		const body = req.body;
		const addedUser = await userSrvc.createUser(body);
		res.json({ data: addedUser });
	} catch (err) {
		next(err);
	}
};

const getProduct = async (req, res, next) => {
	try {
		const { shortId } = req.body;
		const foundProduct = await productSrvc.findProduct(shortId);
		res.json({ result: foundProduct });
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

// multer 검증 용도 작업중...
// multipart-formdata 로 요청된 작업을 multer 이외의 방법으로
// request 를 검증하는 법을 모르겠음
const checkProduct = async (req, res, next) => {
	try {
		const location = req.files;
		const body = req.body;
		// const addedProduct = await productSrvc.createProduct(location, body);
		// res.json({ data: addedProduct });
		// console.log(body);
		// console.log(req.headers);
		console.log(req);
		res.json({ data: body });
	} catch (err) {
		res.json({ message: "상품 정보를 확인해주세요" });
	}
};

module.exports = {
	addUser,
	getProductList,
	getProduct,
	editProduct,
	removeProduct,
	checkProduct,
};
