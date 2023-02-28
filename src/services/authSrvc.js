const bcrypt = require("bcrypt");
const formCheck = require("../utils/formCheck");
const jwtMdw = require("../middleware/jwtMdw");
const { Admin, User } = require("../db/model/index");

const registerUser = async (userInfo) => {
	try {
		const { email, password, name, phone, shipAdr } = userInfo;

		const isRemoved = await User.findOne({ email });
		console.log(isRemoved);
		if (isRemoved?.password === "탈퇴한회원") {
			throw new Error("탈퇴한 이메일로 가입할 수 없습니다.");
		}
		if (!formCheck.emailFormCheck(email)) {
			throw new Error("올바른 이메일을 입력해주세요");
		}
		if (password?.length < 4) {
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
			shipAdr,
		});
		return user;
	} catch (err) {
		throw new Error(err);
	}
};

const loginUser = async (userInfo) => {
	try {
		const { email, password } = userInfo;
		const isAdmin = await Admin.findOne({ email });
		if (isAdmin) {
			const checkAdminPwd = await bcrypt.compare(password, isAdmin.password);
			if (!checkAdminPwd) {
				throw new Error("비밀번호를 확인해주세요");
			}

			const accessToken = jwtMdw.generateToken(isAdmin._id, "1h", true);
			return accessToken;
		}

		const targetUser = await User.findOne({ email });

		if (!targetUser) {
			throw new Error("이메일을 확인해주세요");
		}
		const checkPwd = await bcrypt.compare(password, targetUser.password);
		if (!checkPwd) {
			throw new Error("비밀번호를 확인해주세요");
		}

		const accessToken = jwtMdw.generateToken(targetUser._id, "1h", false);

		return accessToken;
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	registerUser,
	loginUser,
};
