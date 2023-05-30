const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const indexRouter = require("./src/controller/routes/index");
const adminRouter = require("./src/controller/routes/admin");
const userRouter = require("./src/controller/routes/user");
const authRouter = require("./src/controller/routes/auth");
const mongooseConnect = require("./src/index");

const app = express();
mongooseConnect();

app.use(morgan("dev"));
// 바디 파서 역할
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET_COOKIE));

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use("/api", indexRouter);
app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 없습니다`);
  error.status = 404;
  next(error);
});

// 오류처리 미들웨어
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`[Express]: ${process.env.PORT}번으로 연결되었습니다.`);
});

module.exports = app;
