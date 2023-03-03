const userSrvc = require("../services/userSrvc");

require("dotenv").config();
// 토큰 테스트
const jwt = require("jsonwebtoken");
const jwtMdw = require("../middleware/jwtMdw");
// 토큰 테스트

// 회원 대상. 주문페이지 회원정보 수정
const handleUser = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const userInfo = req.body;
		const result = await userSrvc.handleUserInfo(userId, userInfo);
		res.json({ result });
	} catch (err) {
		next(err);
	}
};

// 회원 마이페이지 조회
const getMypage = async (req, res, next) => {
	try {
		const header = req.headers.authorization;
		const token = header && header.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "AccessToken 이 없습니다." });
		} else {
			console.log("토큰 있구여~");
		}
		console.log(12121212);
		const secret = process.env.SECRET_JWT; // dotenv
		const payload = jwt.verify(token, secret); // jsonwebtoken
		const { userId } = req.params;
		const userInfo = await userSrvc.findUserInfo(userId);
		// const userInfo = await userSrvc.findUserInfo(userId, userCheck);
		res.json(userInfo);
	} catch (err) {
		next(err);
	}
};

// 회원 마이페이지 이메일 수정
const editUserEmail = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const body = req.body;
		const newUserInfo = await userSrvc.updateUserEmail(userId, body);
		res.json(newUserInfo);
	} catch (err) {
		next(err);
	}
};

// 회원 마이페이지 주소 수정
const editUserAddress = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const body = req.body;
		const newUserInfo = await userSrvc.updateUserAddress(userId, body);
		res.json({ newUserInfo });
	} catch (err) {
		next(err);
	}
};

// 회원 탈퇴
const closeAccount = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const result = await userSrvc.deleteAccount(userId);
		res.json({ message: result });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	handleUser,
	getMypage,
	editUserEmail,
	editUserAddress,
	closeAccount,
};

//안쓰는 함수 orderCtrl 에서 대체
// const addUserWhenOrder = async (req, res, next) => {
// 	try {
// 		const body = req.body;
// 		res.locals.body = body;
// 		const addedUser = await userSrvc.createUser(body);
// 		res.locals.user = addedUser;
// 		next();
// 	} catch (err) {
// 		next(err);
// 	}
// };
