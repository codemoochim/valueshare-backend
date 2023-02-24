const productSrvc = require("../services/productSrvc");
const categorySrvc = require("../services/categorySrvc");
const brandSrvc = require("../services/brandSrvc");

// 유저, 어드민 페이지 목록 조회
const getProductList = async (req, res, next) => {
	try {
		// 페이지네이션 기능 쿼리/파리미터 받아와야함
		const productList = await productSrvc.findProductList();
		res.json({ result: productList });
	} catch (err) {
		next(err);
	}
};

// 어드민 상품 목록 추가
const addProduct = async (req, res, next) => {
	try {
		const location = req.files;
		const body = req.body;
		const addedProduct = await productSrvc.createProduct(location, body);
		res.json({ data: addedProduct }); // 나중에 result 로 바꿀 수 있는지 물어보기
	} catch (err) {
		next(err);
	}
};

// 유저, 어드민 상품 상세 조회
const getProduct = async (req, res, next) => {
	try {
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
		const { categories, brand } = req.query;
		const foundProdcut = await productSrvc.findProductListByQuery(
			categories,
			brand,
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
	// getProductByCategory,
	// getProductByBrand,
	getProductByQuery,
};
// // 유저 카테고리만 고려
// const getProductByCategory = async (req, res, next) => {
// 	try {
// 		const { categories } = req.query;
// 		const foundProduct = await categorySrvc.findProductByCategory(categories);
// 		res.json({ result: foundProduct });
// 	} catch (err) {
// 		next(err);
// 	}
// };

// // 유저 브랜드만 고려
// const getProductByBrand = async (req, res, next) => {
// 	try {
// 		const { brand } = req.query;
// 		const brandList = await brandSrvc.findProductByBrand(brand);
// 		res.json({ result: brandList });
// 	} catch (err) {
// 		next(err);
// 	}
// };
