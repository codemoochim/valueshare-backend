const { Brand, Category, Product, User } = require("../db/model/index");
const fromCheck = require("../utils/formCheck");
const issueOrderNum = require("../utils/issueOrderNum");

const createUser = async (body) => {
	try {
		const email = body.email;
		const brandNewOrederNum = issueOrderNum();
		if (!email) {
			throw new Error("이메일을 입력해주세요");
		}
		if (!fromCheck.emailFormCheck(email)) {
			throw new Error("이메일의 형식을 확인하세요");
		}
		const createdUser = await User.create({
			email,
			orderNumber: brandNewOrederNum,
		});
		return createdUser;
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = {
	createUser,
};

// 비회원이 주문했을 떄 이메일로 유저정보를 생성하는데 디비검사를 안해서,
// 회원가입할때 비회원으로서 주문했었던 이력이 있으면 그 이메일로는 회원가입을 못함
// 비회원의 이메일 주문 시 동일한 이메일로 주문했을 때 계정을 생성하지 않고
// 그 계정에 주문번호를 Array로 던져주는 법으로 해야함
