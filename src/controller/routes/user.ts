import { Router } from "express";

import {
	getOrderDetailForUser,
	editOrderDetailForUser,
	cancelOrderDetailForUser,
} from "../orderCtrl";

import {
	handleUser,
	getMypage,
	editUserEmail,
	editUserAddress,
	closeAccount,
} from "../userCtrl";

// import jwtMdw from "../../middleware/jwtMdw";
const router = Router();

// 비회원 유저 주문관리
router
	.route("/orders/:orderNumber")
	.post(getOrderDetailForUser)
	.patch(editOrderDetailForUser)
	.put(cancelOrderDetailForUser);

// 회원 결제페이지 배송지 수정시 회원정보 변경
router.post(
	"/:userId/userInfo",
	// jwtMdw.verifyAccessToken,
	handleUser,
);

// 회원 마이페이지
router.get(
	"/mypage/:userId",
	//  jwtMdw.verifyAccessToken,
	getMypage,
);
router.post(
	"/mypage/:userId/email",
	// jwtMdw.verifyAccessToken,
	editUserEmail,
);
router.post(
	"/mypage/:userId/address",
	// jwtMdw.verifyAccessToken,
	editUserAddress,
);
router.delete(
	"/mypage/:userId",
	// jwtMdw.verifyAccessToken,
	closeAccount,
);

export default router;
