const productSrvc = require("../services/productSrvc");
const categorySrvc = require("../services/categorySrvc");
const brandSrvc = require("../services/brandSrvc");
require("dotenv").config();
// 토큰 테스트
const jwt = require("jsonwebtoken");
const jwtMdw = require("../middleware/jwtMdw");
// 토큰 테스트

// 어드민 상품 목록 조회
const getProductList = async (req, res, next) => {
	try {
		const productList = await productSrvc.findProductList();

		// const page = Number(req.query.page || 1);
		// const perPage = Number(req.query.perPage || 10);
		// const productList = await productSrvc.findProductList(page, perPage);

		res.json({ result: productList });
	} catch (err) {
		next(err);
	}
};

// 어드민 상품 추가
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

// 유저, 어드민 상품 상세 조회
const getProduct = async (req, res, next) => {
	try {
		console.log(121212121212);
		// console.log();
		const header = req.headers.authorization;
		console.log(header);
		console.log(454545454545);
		// console.log(req.header("Authorization"));
		const token = header && header.split(" ")[1];

		console.log("토큰토큰토큰");
		console.log(token);
		console.log("토큰토큰토큰");
		if (!token) {
			return res.status(401).json({ message: "AccessToken 이 없습니다." });
		}

		const secret = process.env.SECRET_JWT;
		const payload = jwt.verify(token, secret);
		req.user = payload;

		console.log(12121212);
		console.log(payload);
		console.log(9238744587230);
		console.log(req.user);
		console.log(12121212);

		const { _id } = req.params;
		const foundProduct = await productSrvc.findProduct(_id);
		res.json({ result: foundProduct });
	} catch (err) {
		next(err);
	}
};

// 유저 쿼리 필터링
const getProductByQuery = async (req, res, next) => {
	try {
		const { categories } = req.query;
		req.query.brand = req.query.brand.split(",");
		const { brand } = req.query;

		const page = Number(req.query.page || 1);
		const perPage = Number(req.query.perPage || 20);

		const foundProdcut = await productSrvc.findProductListByQuery(
			categories,
			brand,
			page,
			perPage,
		);
		res.json({ result: foundProdcut });
	} catch (err) {
		next(err);
	}
};

// 어드민 상품 상세 수정
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

// 어드민 상품 삭제
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
	getProductByQuery,
};
