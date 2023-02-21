const express = require("express");
const router = express.Router();
const productCtrl = require("../productCtrl");
const userCtrl = require("../userCtrl");
const orderCtrl = require("../orderCtrl");

/* 메인페이지 */
router.get("/", (req, res, next) => {
	// 	// 메인페이지 렌더링 데이터 응답
	res.send("main page rendering complete");
});

// 전체 상품 목록 조회
router.route("/products").get(productCtrl.getProductList);

// 주문 체결. 체크 아웃
router.route("/checkout").post(userCtrl.addUser, orderCtrl.addOrder);

module.exports = router;
