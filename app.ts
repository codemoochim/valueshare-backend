import express, {
	json,
	urlencoded,
	Request,
	Response,
	NextFunction,
} from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import indexRouter from "./src/controller/routes/index";
import adminRouter from "./src/controller/routes/admin";
import userRouter from "./src/controller/routes/user";
import authRouter from "./src/controller/routes/auth";
import mongooseConnect from "./src/index";

dotenv.config();

const app = express();
mongooseConnect();

app.use(morgan("dev"));
// 바디 파서 역할
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET_COOKIE));

app.use(
	cors({
		origin: "*",
		credentials: true,
		// optionsSuccessStatus: 200,
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
app.use((err, req: Request, res: Response, next: NextFunction) => {
	res.locals.message = err.message;
	// res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status || 500);
	res.send(err.message);
});

app.listen(process.env.PORT || "5000");
export default app;
