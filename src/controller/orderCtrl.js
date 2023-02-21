const orderSrvc = require("../services/orderSrvc");

const addOrder = async (req, res, next) => {
	try {
		const orderData = req.body;
		const newUser = res.locals.user;
		const addedOrder = await orderSrvc.createOrder(orderData, newUser);
		res.json({ result: addedOrder });
	} catch (err) {
		next(err);
	}
};

const getOrderList = async (req, res, next) => {
	try {
		const orderList = await orderSrvc.findOrderList();
		res.json({ result: orderList });
	} catch (err) {
		next(err);
	}
};

const getOrderDetail = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const orderDetail = await orderSrvc.findOrderDetail(_id);
		res.json({ result: orderDetail });
	} catch (err) {
		throw new Error(err);
	}
};

const editOrderDetail = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const newOrderDetail = req.body;
		const editedOrderDetail = await orderSrvc.updateOrderDetail(
			_id,
			newOrderDetail,
		);
		res.json({ result: editedOrderDetail });
	} catch (err) {
		throw new Error(err);
	}
};

const cancelOrderDetail = async (req, res, next) => {
	try {
		const { _id } = req.params;
		await orderSrvc.closedOrderDetail(_id);
		res.json({ message: "주문 취소가 완료되었습니다." });
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	addOrder,
	getOrderList,
	getOrderDetail,
	editOrderDetail,
	cancelOrderDetail,
};
