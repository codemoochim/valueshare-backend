const userSrvc = require("../services/userSrvc");

const addUserWhenOrder = async (req, res, next) => {
	try {
		const body = req.body;
		res.locals.body = body;
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
