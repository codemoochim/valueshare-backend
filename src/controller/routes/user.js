const express = require("express");
const router = express.Router();
const productCtrl = require("../productCtrl");
const orderCtrl = require("../orderCtrl");

// /users
// 사용자 입장

// 전체 상품 목록 조회
// router.route("/products").get(productCtrl.getProductList);
// router.route("/products/:_id").get(productCtrl.getProduct);

// 유저 주문관리
router
	.route("/orders/:_id")
	.get(orderCtrl.getOrderDetailForUser)
	.patch(orderCtrl.editOrderDetailForUser)
	.post(orderCtrl.cancelOrderDetailForUser);

module.exports = router;
