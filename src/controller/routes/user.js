const express = require("express");
const router = express.Router();
const orderCtrl = require("../orderCtrl");
const userCtrl = require("../userCtrl");
const { Admin } = require("../../db/model");
const bcrypt = require("bcrypt");

// /users
// 사용자 입장
// 어드민 계정 추가
// router.post("/add", async (req, res, next) => {
// 	try {
// 		const { email, password } = req.body;
// 		const pwd = await bcrypt.hash(password, 12);
// 		const admin = await Admin.create({
// 			email,
// 			password: pwd,
// 		});

// 		res.json({ admin });
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

router.post("/:userId/userInfo", userCtrl.handleUser);

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
router.delete("/mypage/:userId", userCtrl.closeAccount);

module.exports = router;

/**
 * 주문 체결시 제출한 정보(이메일)로 유저가 생성됨. 비회원 주문을 관리하기 위해서.
 *
 *
 * 비회원 주문시 유저정보 생성 없음. 주문번호와 제출했던 이메일로만.
 */
