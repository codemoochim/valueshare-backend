const userSrvc = require("../services/userSrvc");

const addUserWhenOrder = async (req, res, next) => {
	try {
		const body = req.body;
		const addedUser = await userSrvc.createUser(body);
		res.locals.user = addedUser;
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = {
	addUserWhenOrder,
};
