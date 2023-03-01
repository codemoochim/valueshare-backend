const userSrvc = require("../services/userSrvc");

// 회원 ? 정보 수정 : 정보 생성
const handleUser = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		console.log(userId);
		const userInfo = req.body;
		const result = await userSrvc.handleUserInfo(userId, userInfo);
		res.json({ result });
	} catch (err) {
		next(err);
	}
};

const getMypage = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const userInfo = await userSrvc.findUserInfo(userId);
		res.json(userInfo);
	} catch (err) {
		next(err);
	}
};

const editUserEmail = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const body = req.body;
		const newUserInfo = await userSrvc.updateUserEmail(userId, body);
		res.json(newUserInfo);
	} catch (err) {
		next(err);
	}
};

const editUserAddress = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const body = req.body;
		const newUserInfo = await userSrvc.updateUserAddress(userId, body);
		res.json({ newUserInfo });
	} catch (err) {
		next(err);
	}
};

const closeAccount = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const result = await userSrvc.deleteAccount(userId);
		res.json({ message: result });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	handleUser,
	getMypage,
	editUserEmail,
	editUserAddress,
	closeAccount,
};

//안쓰는 함수 orderCtrl 에서 대체
// const addUserWhenOrder = async (req, res, next) => {
// 	try {
// 		const body = req.body;
// 		res.locals.body = body;
// 		const addedUser = await userSrvc.createUser(body);
// 		res.locals.user = addedUser;
// 		next();
// 	} catch (err) {
// 		next(err);
// 	}
// };
