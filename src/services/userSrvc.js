const { Brand, Category, Product, User } = require("../db/model/index");
const fromCheck = require("../utils/formCheck");
const issueOrderNum = require("../utils/issueOrderNum");

const createUser = async (body) => {
	try {
		console.log(2);
		const email = body.email;
		console.log(email);
		console.log(3);
		const brandNewOrederNum = issueOrderNum();
		if (!email) {
			throw new Error("이메일을 입력해주세요");
		}
		if (!fromCheck.eamilFormCheck(email)) {
			throw new Error("이메일의 형식을 확인하세요");
		}
		const createdUser = await User.create({
			email,
			orderNumber: brandNewOrederNum,
		});
		console.log(40);
		return createdUser;
	} catch (err) {
		throw new Error(err);
	}
};

const createAccount = async () => {
	try {
	} catch (err) {
		throw new Error("회원가입에 실패하였습니다");
	}
};

module.exports = {
	createUser,
	createAccount,
};
