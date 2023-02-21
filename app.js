const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const qs = require("qs");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
// const dayjs = require("dayjs");
dotenv.config();

const indexRouter = require("./src/controller/routes/");
const adminRouter = require("./src/controller/routes/admin");
const userRouter = require("./src/controller/routes/user");

const mongooseConnect = require("./src/index");
const app = express();
mongooseConnect();

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));
// 바디 파서 역할
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.SECRET_SESSION,
		cookie: {
			httpOnly: true,
			secure: false,
		},
		name: "session-cookie",
	}),
);

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
		// optionsSuccessStatus: 200,
	}),
);
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/users", userRouter);

// 유저의 잘못된 URI 경로 요청에 대한 에러 응답
app.use((req, res, next) => {
	next(createError(404));
});

// 오류처리 미들웨어
app.use((err, req, res, next) => {
	// 개발 단계에서만 에러를 화면에 보여줌
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// 배포 후 에러 발생 시, 에러 페이지를 렌더링 해줍니다. 파일 및 폴더구조 노출 방지 목적
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
