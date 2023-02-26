const express = require("express");

const { isLoggedIn, isNotLoggedIn } = require("../../middleware/checkLogin");
const { register, login, logout } = require("../auth");

const router = express.Router();

// /auth/register
// 회원가입
router.post("/register", isNotLoggedIn, register);

// /auth/login
// 로그인
router.post("/login", isNotLoggedIn, login);

// /auth/logout
// 로그아웃
router.get("/logout", isLoggedIn, logout);

module.exports = router;
