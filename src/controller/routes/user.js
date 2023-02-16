const express = require("express");
const router = express.Router();
const productForUserController = require("../productForUserController");

// /user
// 사용자 페이지

// 상품 정보 수정
router.get("/product", productForUserController);

module.exports = router;
