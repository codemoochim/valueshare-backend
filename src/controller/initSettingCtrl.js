const initSettingSrvc = require("../services/initSettingSrvc");

const setCtrl = async (req, res, next) => {
	try {
		const setResult = await initSettingSrvc.setSrvc();
		console.log(setResult);
		res.json("성공햬쪄");
	} catch (err) {
		next(err);
	}
};

module.exports = { setCtrl };
