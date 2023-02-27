const express = require("express");
const router = express.Router();
const orderCtrl = require("../orderCtrl");
const userCtrl = require("../userCtrl");

// /users
// 사용자 입장

// 유저 비회원 주문관리
router
	.route("/orders/:orderNumber")
	.post(orderCtrl.getOrderDetailForUser)
	.patch(orderCtrl.editOrderDetailForUser)
	.put(orderCtrl.cancelOrderDetailForUser);

// 회원 마이페이지
router.get("/mypage/:userId", userCtrl.getMypage);
router.post("/mypage/:userId/email", userCtrl.editUserEmail);
router.post("/mypage/:userId/address", userCtrl.editUserAddress);

module.exports = router;
