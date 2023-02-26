const bcrypt = require("bcrypt");
const formCheck = require("../utils/formCheck");
const { User } = require("../db/model/index");

const registerUser = async (userInfo) => {
	try {
		const { email, password, name, phone, address } = userInfo;
		if (!formCheck.emailFormCheck(email)) {
			throw new Error("올바른 이메일을 입력해주세요");
		}
		if (password.length < 4) {
			throw new Error("비밀번호는 4자리 이상입니다");
		}
		const [isExist, hash] = await Promise.all([
			User.findOne({ email }),
			bcrypt.hash(password, 12),
		]);
		if (isExist) {
			throw new Error("동일한 이메일이 존재합니다");
		}
		const user = await User.create({
			email,
			password: hash,
			name,
			phone,
			address,
		});
		return user;
	} catch (err) {
		throw new Error(err);
	}
};

const loginUser = async (userInfo) => {
	try {
		const { email, password } = userInfo;
		const targetUser = await User.findOne({ email });

		if (!targetUser) {
			throw new Error("이메일을 확인해주세요");
		}
		const checkPwd = await bcrypt.compare(password, targetUser.password);
		if (!checkPwd) {
			throw new Error("비밀번호를 확인해주세요");
		}
		return targetUser;
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	registerUser,
	loginUser,
};
