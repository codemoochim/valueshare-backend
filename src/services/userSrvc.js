const { Brand, Category, Product, User, Order } = require("../db/model/index");

const findUserInfo = async (userId) => {
	try {
		const userInfo = await User.findById({ _id: userId });
		if (!userInfo) {
			return new Error("회원 정보가 없습니다");
		}
		const userOrderHistory = await Order.find({ userId: userInfo });
		return [userInfo, userOrderHistory];
	} catch (err) {
		throw new Error("회원 정보를 찾을 수 없습니다.");
	}
};

const updateUserInfo = async (userId, body) => {
	try {
		const userInfo = await User.findById({ _id: userId });

		userInfo.email = body?.email;
		userInfo.address = body?.address;
		await userInfo.save();
		return userInfo;
	} catch (err) {
		throw new Error("회원 정보를 찾을 수 없습니다.");
	}
};

module.exports = {
	findUserInfo,
	updateUserInfo,
};

// 비회원이 주문했을 떄 이메일로 유저정보를 생성하는데 디비검사를 안해서,
// 회원가입할때 비회원으로서 주문했었던 이력이 있으면 그 이메일로는 회원가입을 못함
// 비회원의 이메일 주문 시 동일한 이메일로 주문했을 때 계정을 생성하지 않고
// 그 계정에 주문번호를 Array로 던져주는 법으로 해야함

// // 안쓰는 함수 orderSrvc에서 대체
// const createUser = async (body) => {
// 	try {
// 		const email = body.email;
// 		if (!email) {
// 			throw new Error("이메일을 입력해주세요");
// 		}
// 		if (!fromCheck.emailFormCheck(email)) {
// 			throw new Error("이메일의 형식을 확인하세요");
// 		}
// 		const brandNewOrederNum = issueOrderNum();
// 		const createdUser = await User.create({
// 			email,
// 			orderNumber: brandNewOrederNum,
// 		});
// 		return createdUser;
// 	} catch (err) {
// 		throw new Error(err);
// 	}
// };
