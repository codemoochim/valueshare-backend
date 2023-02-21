const { v4: uuid } = require("uuid");
const { Brand, Category, Product, User } = require("../db/model/index");

const createUser = async (body) => {
	try {
		const { email } = body;
		const neworderNumber = uuid();
		// 이메일 형식 검증
		// const emailForm = new RegExp("/^[a-z0-9]+@[a-z]{2,3}");
		// if (!emailForm.test(email) || !email) {
		// 	throw new Error("이메일의 형식을 확인해주세요");
		// }

		const createdUser = await User.create({
			email,
			orderNumber: [neworderNumber],
		});
		return createdUser;
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = {
	createUser,
};
