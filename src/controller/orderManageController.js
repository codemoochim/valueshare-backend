const orderManageServices = require("../services/orderManageServices");

const getOrderLists = async (req, res, next) => {
	try {
		const orderLists = await orderManageServices.orderListsTakeout();
		res.json({ data: orderLists });
	} catch (err) {
		next(err);
	}
};

const getOrderDetails = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		const result = await orderManageServices.orderDetailsGet(shortId);
		res.json({ data: result });
	} catch (err) {
		throw new Error(err);
	}
};

const editOrderDetails = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		const newOrderDetails = req.body;
		const result = await orderManageServices.orderDetilasEdit(
			shortId,
			newOrderDetails,
		);
		res.json({ data: result });
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = {
	getOrderLists,
	getOrderDetails,
	editOrderDetails,
};
