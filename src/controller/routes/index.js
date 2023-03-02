const express = require("express");
const router = express.Router();
const productCtrl = require("../productCtrl");
const orderCtrl = require("../orderCtrl");

/* 메인페이지 */
router.get("/", (req, res, next) => {
	res.send(
		`
		<h1>Hello Team No.1</h1> 
		<h2>Shout out to 정선민</h2>
		<h2>Shout out to 김여진</h2>
		`,
	);
});

// 유저 상품 목록 조회
router.get("/products", productCtrl.getProductByQuery);

// 유저 상품 상세 조회
// admin 라우터에 있었는데 인덱스에서도 받아야함
router.get("/products/:_id", productCtrl.getProduct);

// 유저 주문체결 시 유저 정보 생성과 체크아웃
router.post("/checkout", orderCtrl.addOrder);

// 유저 주문 체결 후 주문 완료페이지
router.get("/myorder/:_id", orderCtrl.brandNewOrderInfo);

// 유저 검증 없이 바로 주문 수정 및 취소
router.patch("/myorder/:_id", orderCtrl.editOrderRightASec);

module.exports = router;
