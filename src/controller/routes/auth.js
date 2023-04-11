const express = require("express");
const passport = require("passport");
const router = express.Router();
const authCtrl = require("../authCtrl");

// /auth/register
// 회원가입
router.post("/register", authCtrl.register);

// /auth/login
// 로그인
router.post(
  "/login",
  // (req, res, next) => {
  //   if (req.signedCookies["accessToken"]) {
  //     const err = { message: "이미 로그인했습니다." };
  //     next(err);
  //   }
  //   next();
  // },
  authCtrl.login
);
router.get("/logout", authCtrl.logout);
// /auth/logout
// 로그아웃 프론트에서 요청 없이 accessToken 삭제로 해결

// 로그아웃 요청시 쿠키 여부 확인하고 쿠키 삭제. access, refresh 그리고
// 레디스에서도 삭제...
// 쿠키 뜯어서 JWT 확인하는 거 만들기...
// router.get("/logout", authCtrl.logout);

// GET /auth/google
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );

module.exports = router;
