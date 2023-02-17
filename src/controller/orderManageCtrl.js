const orderManageSrvc = require("../services/orderManageSrvc");

const getOrderList = async (req, res, next) => {
	try {
		const orderList = await orderManageSrvc.findOrderList();
		res.json({ result: orderList });
	} catch (err) {
		next(err);
	}
};

const getOrderDetail = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		const orderDetail = await orderManageSrvc.findOrderDetail(shortId);
		res.json({ result: orderDetail });
	} catch (err) {
		throw new Error(err);
	}
};

const editOrderDetail = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		const newOrderDetail = req.body;
		const editedOrderDetail = await orderManageSrvc.updateOrderDetail(
			shortId,
			newOrderDetail,
		);
		res.json({ result: editedOrderDetail });
	} catch (err) {
		throw new Error(err);
	}
};

const removeOrderDetail = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		await orderManageSrvc.deleteOrderDetail(shortId);
		res.json({ message: "주문 삭제가 완료되었습니다." });
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	getOrderList,
	getOrderDetail,
	editOrderDetail,
	removeOrderDetail,
};
