const { Brand, Category, Product, User, Order } = require("../db/model/index");
// const { emailFormCheck } = require("../utils/formCheck");

// const handleUserInfo = async (userInfo) => {
// 	try {
// 		const { name, phoneNumber, shipAdr, shipNote, email } = userInfo;

// 		// 이메일 회원검증
// 		const memberCheck = await User.findOne({ email });
// 		// 기존 유저정보 수정
// 		memberCheck.email = email;
// 		memberCheck.phoneNumber = phoneNumber;
// 		memberCheck.name = name;
// 		memberCheck.shipAdr = shipAdr;
// 		memberCheck.shipNote = shipNote;
// 		await memberCheck.save();
// 		console.log("기존 회원정보 수정");
// 		return memberCheck;
// 	} catch (err) {
// 		throw new Error(err);
// 	}
// };

const findUserInfo = async (userId) => {
	try {
		const userInfo = await User.findById({ _id: userId }, { password: 0 });
		if (!userInfo) {
			throw new Error("회원 정보가 없습니다");
		}
		const userOrderHistory = await Order.find({ userId: userInfo });

		return [userInfo, userOrderHistory];
	} catch (err) {
		throw new Error(err);
	}
};

const updateUserEmail = async (userId, body) => {
	try {
		const userInfo = await User.findById({ _id: userId }, { password: 0 });
		const email = body?.email;
		// if (!emailFormCheck(email)) {
		// 	throw new Error("올바른 이메일을 입력해주세요");
		// }
		userInfo.email = email;

		await userInfo.save();

		return userInfo;
	} catch (err) {
		throw new Error(err);
	}
};

const updateUserAddress = async (userId, body) => {
	try {
		const userInfo = await User.findById({ _id: userId }, { password: 0 });
		const { shipAdr, shipNote, name } = body;
		if (!shipAdr) {
			throw new Error("주소를 입력하세요");
		}
		userInfo.shipAdr = shipAdr;
		userInfo.shipNote = shipNote;
		userInfo.name = name;

		await userInfo.save();

		return userInfo;
	} catch (err) {
		throw new Error(err);
	}
};

const deleteAccount = async (userId) => {
	try {
		const userInfo = await User.findByIdAndDelete({ _id: userId });
		if (!userInfo) {
			throw new Error("탈퇴가 정상적으로 이루어지지 않았습니다.");
		}
		return "탈퇴처리 되었습니다.";
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = {
	// handleUserInfo,
	findUserInfo,
	updateUserEmail,
	updateUserAddress,
	deleteAccount,
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
