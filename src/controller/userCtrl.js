const userSrvc = require("../services/userSrvc");

const addUser = async (req, res, next) => {
	try {
		const body = req.body;
		const addedUser = await userSrvc.createUser(body);
		res.locals.user = addedUser;
		next();
	} catch (err) {
		next(err);
	}
};

const addAccount = async (req, res, nect) => {
	try {
		const { email, password } = req.body;
	} catch (err) {
		next(err);
	}
};

module.exports = {
	addUser,
	addAccount,
};
