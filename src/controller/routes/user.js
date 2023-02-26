const express = require("express");
const router = express.Router();
const orderCtrl = require("../orderCtrl");

// /users
// 사용자 입장

// 유저 비회원 주문관리
router
	.route("/orders/:orderNumber")
	.post(orderCtrl.getOrderDetailForUser)
	.patch(orderCtrl.editOrderDetailForUser)
	.put(orderCtrl.cancelOrderDetailForUser);

module.exports = router;
