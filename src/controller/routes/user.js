const express = require("express");
const router = express.Router();
const productCtrl = require("../productCtrl");
const orderCtrl = require("../orderCtrl");

// /user
// 사용자 입장

// 전체 상품 목록 조회
router.route("/products").get(productCtrl.getProductList);
router.route("/products/:_id").get(productCtrl.getProduct);

// 유주 주문관리
router.route("orders").get(orderCtrl.getOrderList);
router
	.route("orders/:_id")
	.get(orderCtrl.getOrderDetail)
	.patch(orderCtrl.editOrderDetail)
	.post(orderCtrl.cancelOrderDetail);

module.exports = router;
