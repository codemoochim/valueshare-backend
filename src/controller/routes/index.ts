import { Router } from "express";
import { getProductByQuery, getProduct } from "../productCtrl";
import { addOrder, brandNewOrderInfo, editOrderRightASec } from "../orderCtrl";

const router = Router();

/* 메인페이지 */
router.get("/", (req, res, next) => {
	res.send(
		`
		가치를 입다. 가치를 나누다. 벨류쉐어
		`,
	);
});

// 유저 상품 목록 조회
router.get("/products", getProductByQuery);

// 유저 상품 상세 조회
router.get("/products/:productId", getProduct);

// 유저 주문체결 시 유저 정보 생성과 체크아웃
router.post("/checkout", addOrder);

// 유저 주문 체결 후 주문 완료페이지
router.get("/myorder/:orderId", brandNewOrderInfo);

// 유저 검증 없이 바로 주문 수정 및 취소
router.patch("/myorder/:orderId", editOrderRightASec);

export default router;
