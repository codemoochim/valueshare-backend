const express = require("express");
const router = express.Router();
const productCtrl = require("../productCtrl");
const categoryCtrl = require("../categoryCtrl");
const brandCtrl = require("../brandCtrl");
const userCtrl = require("../userCtrl");
const orderCtrl = require("../orderCtrl");
const { register, login } = require("../auth");

/* 메인페이지 */
// router.get("/:products", (req, res) => {
// 	// console.log(req);
// 	// res.send("dd");
// });

router.get("/", (req, res, next) => {
	res.send("main page rendering complete");
});

// 유저 쿼리 필터링
// 정상작동 필터링 안됨
// router.route("/products").get(productCtrl.getProductList);
// 필터링 되는데 프론트 코드와 맞춰야함
router.get("/products", productCtrl.getProductByQuery);

// 주문 체결. 체크 아웃
router.post("/checkout", userCtrl.addUserWhenOrder, orderCtrl.addOrder);
// 주문 체결 후 랜더링 되는 페이지. 주문내역 보여줌
router.get("/myorder/:_id", orderCtrl.brandNewOrderInfo);
// 바로 주문 수정 및 취소
router.patch("/myorder/:_id", orderCtrl.editOrderRightASec);

// 회원가입
router.post("/register", register);

router.post("/login", login);
module.exports = router;
