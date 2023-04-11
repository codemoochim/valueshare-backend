const express = require("express");
const router = express.Router();
const orderCtrl = require("../orderCtrl");
const userCtrl = require("../userCtrl");
const jwtMdw = require("../../middleware/jwtMdw");

// 비회원 유저 주문관리
router
  .route("/orders/:orderNumber")
  .post(orderCtrl.getOrderDetailForUser)
  .patch(orderCtrl.editOrderDetailForUser)
  .put(orderCtrl.cancelOrderDetailForUser);

// 회원 결제페이지 배송지 수정시 회원정보 변경
router.post(
  "/:userId/userInfo",
  // jwtMdw.verifyAccessToken,
  userCtrl.handleUser
);

// 회원 마이페이지
router.get(
  "/mypage/:userId",
  //  jwtMdw.verifyAccessToken,
  userCtrl.getMypage
);
router.post(
  "/mypage/:userId/email",
  // jwtMdw.verifyAccessToken,
  userCtrl.editUserEmail
);
router.post(
  "/mypage/:userId/address",
  // jwtMdw.verifyAccessToken,
  userCtrl.editUserAddress
);
router.delete(
  "/mypage/:userId",
  // jwtMdw.verifyAccessToken,
  userCtrl.closeAccount
);

module.exports = router;
