const express = require("express");
const router = express.Router();
const productCtrl = require("../productCtrl");
const orderCtrl = require("../orderCtrl");

/* 메인페이지 */
router.get("/", (req, res, next) => {
  res.send(
    `
		가치를 입다. 가치를 나누다. 벨류쉐어
		`
  );
});

// 유저 상품 목록 조회

router.get(
  "/products",
  // (req, res, next) => {
  //   console.log(req.signedCookies.accessToken);
  //   console.log(req.signedCookies.refreshToken);
  //   next();
  // },
  productCtrl.getProductByQuery
);

// 유저 상품 상세 조회
router.get("/products/:productId", productCtrl.getProduct);

// 유저 주문체결 시 유저 정보 생성과 체크아웃
router.post("/checkout", orderCtrl.addOrder);

// 유저 주문 체결 후 주문 완료페이지
router.get("/myorder/:orderId", orderCtrl.brandNewOrderInfo);

// 유저 검증 없이 바로 주문 수정 및 취소
router.patch("/myorder/:orderId", orderCtrl.editOrderRightASec);

module.exports = router;
