const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const indexRouter = require("./src/controller/routes/index");
const adminRouter = require("./src/controller/routes/admin");
const userRouter = require("./src/controller/routes/user");
const authRouter = require("./src/controller/routes/auth");
const mongooseConnect = require("./src/index");

const app = express();
mongooseConnect();
// passportConfig();

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
app.use("/auth", authRouter);

app.use((req, res, next) => {
	next(createError(404));
});

// 오류처리 미들웨어
app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
