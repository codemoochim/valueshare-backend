const express = require("express");
const router = express.Router();
const productCtrl = require("../productCtrl");
const categoryCtrl = require("../categoryCtrl");
const brandCtrl = require("../brandCtrl");
const userCtrl = require("../userCtrl");
const orderCtrl = require("../orderCtrl");

// / 루트 경로
/* 메인페이지 */
router.get("/", (req, res, next) => {
	res.send("main page rendering complete");
});

// 유저 전체 상품 목록 조회
router.get("/products", productCtrl.getProductList);

// 유저 카테고리 필터링
router.get("/products/categories", categoryCtrl.getProductByCategory);

// 유저 브랜드 필터링
router.get("/products/brands", brandCtrl.getProductByBrand);

// 주문 체결. 체크 아웃 -- 진행중
router.post("/checkout", userCtrl.addUser, orderCtrl.addOrder);

// 회원가입 -- 진행중
router.post("/register", userCtrl.addAccount);

module.exports = router;
