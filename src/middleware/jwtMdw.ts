import { sign, verify } from "jsonwebtoken";
// const redis = require("redis");
// const { promisify } = require("util");
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_JWT;

const cookieOpt = {
	maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
	httpOnly: true,
	// secure: true, // https
};

// 토큰 생성
const generateToken = (user, time, auth) => {
	const token = sign({ user }, secret, {
		algorithm: "HS256",
		expiresIn: time,
		issuer: "valueshare",
		audience: `${auth}`,
	});
	return token;
};

// accessToken 검증
const verifyAccessToken = (req, res, next) => {
	try {
		const header = req.headers.authorization;
		const token = header && header.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "AccessToken 이 없습니다." });
		}
		console.log("토큰 있구여~");

		// const secret = process.env.SECRET_JWT; // dotenv
		const payload = verify(token, secret); // jsonwebtoken
		req.userOid = payload.user;
		console.log("유저아이디");
		console.log(req.userOid);
		console.log("유저아이디");

		next();
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			return res.status(419).json({
				code: 419,
				message: "토큰이 만료되었습니다 재로그인 해주세요",
			});
		}
	}
};
// const verifyAccessToken = (req, res, next) => {
// 	const header = req.headers.authorization;
// 	const token = header && header.split(" ")[1];
// 	if (!token) {
// 		return res.status(401).json({ message: "AccessToken 이 없습니다." });
// 	} else {
// 		console.log("토큰 있구여~");
// 	}
// 	try {
// 		const payload = jwt.verify(token, secret);
// 		req.locals.user = payload;

// 		next();
// 	} catch (err) {
// 		if (err.name === "TokenExpiredError") {
// 			return res.status(419).json({
// 				code: 419,
// 				message: "토큰이 만료되었습니다 재로그인 해주세요",
// 			});
// 		}
// 	}
// };

export default {
	cookieOpt,
	generateToken,
	verifyAccessToken,
	// verifyRefreshToken,
	// getAsync,
	// setAsync,
	// delAsync,
};

// const verifyRefreshToken = async (req, res, next) => {
// 	const refreshToken = req.cookies["refreshToken"];
// 	if (!refreshToken) {
// 		return res.status(401).json({ message: "RefreshToken이 없습니다." });
// 	}
// 	try {
// 		const userId = await getAsync(refreshToken);
// 		if (!userId) {
// 			return res
// 				.status(401)
// 				.json({ message: "Refresh token 유효하지 않거나 만료됨" });
// 		}

// 		req.userId = userId;
// 		next();
// 	} catch (err) {
// 		return res.status(500).json({ message: "토큰에 문제가 있습니다" });
// 	}
// };

// const redisClient = redis.createClient({
// 	url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
// 	password: process.env.REDIS_PASSWORD,
// 	legacyMode: true,
// });

// redisClient.connect().catch(console.error);

// const getAsync = promisify(redisClient.get).bind(redisClient);
// const setAsync = promisify(redisClient.set).bind(redisClient);
// const delAsync = promisify(redisClient.del).bind(redisClient);
