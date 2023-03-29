import { Router } from "express";
const router = Router();
import { register, login } from "../authCtrl";

// /auth/register
// 회원가입
router.post("/register", register);

// /auth/login
// 로그인
router.post("/login", login);

// /auth/logout
// 로그아웃 프론트에서 요청 없이 accessToken 삭제로 해결
// router.get("/logout", authCtrl.logout);

export default router;
