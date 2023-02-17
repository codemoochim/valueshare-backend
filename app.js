const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const indexRouter = require("./src/controller/routes");
const adminRouter = require("./src/controller/routes/admin");

const mongooseConnect = require("./src/db/schemas");
const app = express();
mongooseConnect();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
// 바디 파서 역할
app.use(bodyParser.json());
// app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// JWT 토큰 구현 시 사용 예정
// app.use(cookieParser());
// 정적 파일
app.use(express.static(path.join(__dirname, "public")));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
		// optionsSuccessStatus: 200,
	}),
);

app.use("/", indexRouter); // 상품 목록 페이지 [메인페이지]
app.use("/admin", adminRouter);

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
