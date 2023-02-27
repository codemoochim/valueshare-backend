const express = require("express");
const jwt = require("jsonwebtoken");
// const redis = require("redis");
const { promisify } = require("util");
require("dotenv").config();
const secret = process.env.SECRET_JWT;

const cookieOpt = {
	maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
	httpOnly: true,
	// domain: "localhost:3000",
	// secure: true, // https
};

const generateToken = (user, time, auth) => {
	const token = jwt.sign({ user }, secret, {
		algorithm: "HS256",
		expiresIn: time,
		issuer: "valueshare",
		audience: `${auth}`,
	});
	return token;
};

const verifyAccessToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) {
		return res.status(401).json({ message: "AccessToken 이 없습니다." });
	}
	try {
		const payload = jwt.verify(token, secret);
		req.user = payload;
		next();
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			return res.status(419).json({
				code: 419,
				message: "토큰이 만료되었습니다",
			});
		}
	}
};

module.exports = {
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
// 		const userEmail = await getAsync(refreshToken);
// 		if (!userEmail) {
// 			return res
// 				.status(401)
// 				.json({ message: "Refresh token 유효하지 않거나 만료됨" });
// 		}

// 		req.userEmail = userEmail;
// 		next();
// 	} catch (err) {
// 		return res.status(500).json({ message: "서버에 벌레가 들어왔어요" });
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
