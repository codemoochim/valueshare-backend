const jwt = require("jsonwebtoken");
const authSrvc = require("../services/authSrvc");
const jwtMdw = require("../middleware/jwtMdw");

const register = async (req, res, next) => {
  try {
    const userInfo = req.body;
    await authSrvc.registerUser(userInfo);
    // const accessToken = jwtMdw.generateToken(user.email, "1h");
    // res.cookie("accessToken", accessToken, jwtMdw.cookieOpt);

    res.json({ message: "회원가입이 완료 되었습니다" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const [user, userRefresh] = await authSrvc.loginUser(userInfo); // user = 액세스 토큰
    res.cookie("accessToken", `${user}`, {
      httpOnly: true,
      signed: true,
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
    });
    res
      .cookie("refreshToken", `${userRefresh}`, {
        httpOnly: true,
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
      })
      .json({ user });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  const accessToken = req.signedCookies?.accessToken;
  const refreshToken = req.signedCookies?.refreshToken;
  try {
    if (!accessToken) {
      return res.status(401).send("accessToken 을 찾을 수 없습니다");
    }
    res.clearCookie("accessToken", `${accessToken}`, {
      httpOnly: true,
      signed: true,
    });
    res.clearCookie("refreshToken", `${refreshToken}`, {
      httpOnly: true,
      signed: true,
    });
    res.send("로그아웃을 완료했습니다");
    // const decoded = jwt.verify(accessToken, process.env.SECRET_JWT);
    // console.log(decoded);
  } catch (err) {
    return res.status(401).send("유효하지 않은 accessToken 입니다.");
  }
};

module.exports = {
  register,
  login,
  logout,
};
// /*********
//  *
//  *  리프레시
//  *
//  */
// // AccessToken 만료시 RefreshToken 을 꺼내와 비교 후 Access 재발급
// const refresh = async (req, res, next) => {
// 	const refreshToken = req.cookies.refreshToken;
// 	if (!refreshToken)
// 		return res.status(401).send("refreshToken 을 찾을 수 없습니다");

// 	const userInfo = req.body;
// 	try {
// 		const decoded = jwt.verify(refreshToken, process.env.SECRET_JWT);
// 		user.email = decoded.email;
// 	} catch (err) {
// 		return res.status(401).send("유효하지 않는 refreshToken");
// 	}

// 	const storedRefreshToken = await jwtMdw.getAsync(
// 		`refreshToken:${user.email}`,
// 	);
// 	if (refreshToken !== storedRefreshToken) {
// 		return res.status(401).send("유효하지 않는 refreshToken");
// 	}

// 	const accessToken = jwtMdw.generateToken(user.email, "1h");
// 	res.json({ accessToken });
// };
