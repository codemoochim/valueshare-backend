import {
	handleUserInfo,
	findUserInfo,
	updateUserEmail,
	updateUserAddress,
	deleteAccount,
} from "../services/userSrvc";

// 회원 대상. 주문페이지 회원정보 수정
const handleUser = async (req, res, next) => {
	try {
		const { userId } = req.params;
		// const userId = req.locals.userOid;
		// console.log(userId);
		const userInfo = req.body;
		const result = await handleUserInfo(userId, userInfo);
		res.json({ result });
	} catch (err) {
		next(err);
	}
};

// 회원 마이페이지 조회
const getMypage = async (req, res, next) => {
	try {
		// console.log("드렁왔나ㅏ?");
		const { userId } = req.params;
		// const userId = req.userOid;
		console.log(userId);
		const userInfo = await findUserInfo(userId);
		res.json(userInfo);
	} catch (err) {
		next(err);
	}
};

// 회원 마이페이지 이메일 수정
const editUserEmail = async (req, res, next) => {
	try {
		const { userId } = req.params;
		// const userId = req.userOid;
		const userEmail = req.body.email;
		const newUserInfo = await updateUserEmail(userId, userEmail);
		res.json(newUserInfo);
	} catch (err) {
		next(err);
	}
};

// 회원 마이페이지 주소 수정
const editUserAddress = async (req, res, next) => {
	try {
		const { userId } = req.params;
		// const userId = req.userOid;
		const { body } = req;
		const newUserInfo = await updateUserAddress(userId, body);
		res.json({ newUserInfo });
	} catch (err) {
		next(err);
	}
};

// 회원 탈퇴
const closeAccount = async (req, res, next) => {
	try {
		const { userId } = req.params;
		// const userId = req.userOid;
		const result = await deleteAccount(userId);
		res.json({ message: result });
	} catch (err) {
		next(err);
	}
};

export default {
	handleUser,
	getMypage,
	editUserEmail,
	editUserAddress,
	closeAccount,
};

// 안쓰는 함수 orderCtrl 에서 대체
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
