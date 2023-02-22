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
		const body = req.body;
		const orderDetail = await orderSrvc.findOrderDetail(_id, body);
		res.json({ result: orderDetail });
	} catch (err) {
		next(err);
	}
};
const getOrderDetailForUser = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const body = req.body;
		const orderDetail = await orderSrvc.findOrderDetailForUser(_id, body);
		res.json({ result: orderDetail });
	} catch (err) {
		next(err);
	}
};

const editOrderDetail = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const editOrderInfo = req.body;
		const editedOrderDetail = await orderSrvc.updateOrderDetail(
			_id,
			editOrderInfo,
		);
		res.json({ result: editedOrderDetail });
	} catch (err) {
		next(err);
	}
};

const editOrderDetailForUser = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const editOrderInfo = req.body;
		const editedOrderDetail = await orderSrvc.updateOrderDetailForUser(
			_id,
			editOrderInfo,
		);
		res.json({ result: editedOrderDetail });
	} catch (err) {
		next(err);
	}
};

const cancelOrderDetail = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const body = req.body;
		await orderSrvc.closedOrderDetail(_id, body);
		res.json({ message: "주문 취소가 완료되었습니다." });
	} catch (err) {
		next(err);
	}
};
const cancelOrderDetailForUser = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const body = req.body;
		await orderSrvc.closedOrderDetailForUser(_id, body);
		res.json({ message: "주문 취소가 완료되었습니다." });
	} catch (err) {
		next(err);
	}
};
module.exports = {
	addOrder,
	getOrderList,
	getOrderDetail,
	editOrderDetail,
	cancelOrderDetail,
	getOrderDetailForUser,
	editOrderDetailForUser,
	cancelOrderDetailForUser,
};
