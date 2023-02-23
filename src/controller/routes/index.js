const express = require("express");
const router = express.Router();
const productCtrl = require("../productCtrl");
const categoryCtrl = require("../categoryCtrl");
const brandCtrl = require("../brandCtrl");
const userCtrl = require("../userCtrl");
const orderCtrl = require("../orderCtrl");
const { register } = require("../auth");
const initSettingCtrl = require("../../../mock/initSettingCtrl");

/* 메인페이지 */
router.get("/", (req, res, next) => {
	res.send("main page rendering complete");
});

// 유저 전체 상품 목록 조회
// 유저 카테고리, 브랜드 필터링
router.get("/products", async (req, res, next) => {
	const { categories, brand } = req.query;
	if (categories) {
		await categoryCtrl.getProductByCategory(req, res, next);
	} else if (brand) {
		await brandCtrl.getProductByBrand(req, res, next);
	} else {
		await productCtrl.getProductList(req, res, next);
	}
});

// 주문 체결. 체크 아웃
router.post("/checkout", userCtrl.addUserWhenOrder, orderCtrl.addOrder);

// 주문 체결 후 랜더링 되는 페이지. 주문내역 보여줌
router.get("/myorder/:_id", orderCtrl.brandNewOrderInfo);

// 회원가입
router.post("/register", register);

// 로그인

module.exports = router;

// 상품 초기세팅
// router.get("/add", initSettingCtrl.setCtrl);

// https://www.coupang.com/np/categories/502993?listSize=60&brand=475
// &
// offerCondition=&filterType=&isPriceRange=false&minPrice=&maxPrice=&page=1&channel=user&fromComponent=N&selectedPlpKeepFilter=&sorter=bestAsc&filter=&rating=0

// https://www.coupang.com/np/categories/502993?listSize=60&brand=475
// %2C486&
// offerCondition=&filterType=&isPriceRange=false&minPrice=&maxPrice=&page=1&channel=user&fromComponent=N&selectedPlpKeepFilter=&sorter=bestAsc&filter=&rating=0
