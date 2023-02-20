const express = require("express");
const router = express.Router();
// const productForUserController = require("../productForUserController");
const productCtrl = require("../productCtrl");
const userCtrl = require("../userCtrl");

// /user
// 사용자 입장

// 전체 상품 목록 조회
router.route("/products").get(productCtrl.getProductList);

// 브랜드 선택
// 유저가 브랜드 체크박스 하는게 get 일까 post 일까? get 같은데
router.route("/products/:shortId").get();

// 결제하기 버튼. 결제완료 후 주문서 제출 post 요청.
router.route("/checkout").post(userCtrl.addUser);

module.exports = router;
