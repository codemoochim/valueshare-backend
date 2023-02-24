const bcrypt = require("bcrypt");
const formCheck = require("../utils/formCheck");
const { User } = require("../db/model/index");
const passport = require("passport");

const register = async (req, res, next) => {
	try {
		const { email, password, name, phone, address } = req.body;
		if (!formCheck.eamilFormCheck(email)) {
			throw new Error({ message: "올바른 이메일을 입력해주세요" });
		}
		if (password.length < 12) {
			throw new Error({ message: "비밀번호는 12자리 이상입니다" });
		}
		const [isExist, hash] = await Promise.all([
			Admin.findOne({ email }),
			bcrypt.hash(password, 12),
		]);
		// 이메일을 검색해서 1개가 있으면 주문내역과 연결해줘야 함
		if (isExist) {
			throw new Error({ message: "동일한 이메일이 존재합니다" });
		}
		await User.create({
			email,
			password: hash,
			name,
			phone,
			address,
		});
		res.json({ message: "가입완료" });
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, pwd } = req.body;
		const checkEmail = await User.findOne({ email });
		if (!checkEmail) throw new Error("이메일이 일치하지 않습니다");
		const checkPwd = bcrypt.compare(pwd, checkEmail.password);
		if (!checkPwd) throw new Error("비밀번호를 확인해주세요");
		next();
	} catch (err) {
		next(err);
	}
};
// setUserToken(res, req.user);

const logout = (req, res) => {
	req.logout(() => {
		res.redirect("/");
	});
};

module.exports = { register, login, logout };
