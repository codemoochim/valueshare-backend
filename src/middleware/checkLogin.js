const isLoggedIn = (req, res, next) => {
	req.isAuthentication()
		? next()
		: res.status(403).json({ message: "로그인이 필요합니다" });
};

const isNotLoggedIn = (req, res, next) => {
	!req.isAuthentication()
		? next()
		: res.redirect("/products").json({ message: "이미 로그인한 상태입니다" });
};

module.exports = {
	isLoggedIn,
	isNotLoggedIn,
};
