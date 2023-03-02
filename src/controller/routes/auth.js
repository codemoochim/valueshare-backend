const express = require("express");
const router = express.Router();
const authCtrl = require("../authCtrl");

// /auth/register
// 회원가입
router.post("/register", authCtrl.register);

// /auth/login
// 로그인
router.post("/login", authCtrl.login);

// /auth/logout
// 로그아웃
router.get("/logout", authCtrl.logout);

module.exports = router;
