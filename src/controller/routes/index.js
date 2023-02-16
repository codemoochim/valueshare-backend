const express = require("express");
const router = express.Router();

// /
/* 메인페이지 */
router.get("/", (req, res, next) => {
	// 메인페이지 렌더링 데이터 응답
	res.send("main page rendering complete");
});

module.exports = router;
