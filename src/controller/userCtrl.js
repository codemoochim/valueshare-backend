const userSrvc = require("../services/userSrvc");

const addUserWhenOrder = async (req, res, next) => {
	try {
		// console.log(0);
		// console.log(req);
		// console.log(1);
		// console.log(req.body);
		// console.log("1 - 1");
		const body = req.body;
		// console.log("1 - 2");
		res.locals.body = body;
		// console.log("1 - 3");
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
