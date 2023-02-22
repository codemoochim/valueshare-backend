const express = require("express");
const router = express.Router();
const productCtrl = require("../productCtrl");
const categoryCtrl = require("../categoryCtrl");
const brandCtrl = require("../brandCtrl");
const userCtrl = require("../userCtrl");
const orderCtrl = require("../orderCtrl");
const { register } = require("../auth");

/* 메인페이지 */
router.get("/", (req, res, next) => {
	res.send("main page rendering complete");
});

// 유저 전체 상품 목록 조회
// 유저 카테고리 필터링
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

// 주문 체결. 체크 아웃 -- 진행중
router.post("/checkout", userCtrl.addUserWhenOrder, orderCtrl.addOrder);

// 회원가입
router.post("/register", register);

// 로그인

module.exports = router;
