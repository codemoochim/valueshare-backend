const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.SECRET_JWT;

exports.secret = secret;

exports.setUserToken = (res, user) => {
	// 유저 jwt 토큰생성
	// JWT 패키지가 user 페이로드와 secret 서명을 함께 섞어 jwt 토큰을 발행해줌
	const token = jwt.sign(user, secret);
	// respons 객체에 jwt토큰을 쿠키로 전달
	res.cookie("token", token);
};
