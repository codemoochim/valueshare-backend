const userSrvc = require("../services/userSrvc");

const getMypage = async (req, res, next) => {
	try {
		const { userId } = req.query;

		const userInfo = await userSrvc.findUserInfo(userId);
		res.json(userInfo);
	} catch (err) {
		next(err);
	}
};

const editUserInfo = async (req, res, next) => {
	try {
		const { userId } = req.query;
		const body = req.body;
		const newUserInfo = await userSrvc.updateUserInfo(userId, body);
		res.json(newUserInfo);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getMypage,
	editUserInfo,
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
