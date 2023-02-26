const orderSrvc = require("../services/orderSrvc");

// 유저 주문 완료 버튼 - 유저 데이터 생성 - 주문 생성
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

// 유저 주문 완료 후 바로 주문 내역 응답
const brandNewOrderInfo = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const orderDetail = await orderSrvc.findOrderDetail(_id);
		res.json([orderDetail]);
	} catch (err) {
		next(err);
	}
};

// 어드민 주문 목록 조회
const getOrderList = async (req, res, next) => {
	try {
		const orderList = await orderSrvc.findOrderList();
		res.json({ result: orderList });
	} catch (err) {
		next(err);
	}
};

// 어드민 주문 상세 조회
const getOrderDetail = async (req, res, next) => {
	try {
		const { _id } = req.params;
		// const body = req.body;
		const orderDetail = await orderSrvc.findOrderDetail(_id);
		res.json({ result: orderDetail });
	} catch (err) {
		next(err);
	}
};

// 어드민 주문 내역 수정
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

// 주문 후 즉시 주문 내역 수정 및 취소
const editOrderRightASec = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const body = req.body;
		if (body.cancelNote) {
			const cancelOrderResult = await orderSrvc.cancelOrder(_id);
			res.json({ result: cancelOrderResult });
		}
		const editOrderResult = await orderSrvc.editOrder(_id, body);
		res.json({ result: editOrderResult });
	} catch (err) {
		next(err);
	}
};

// 어드민 주문 취소
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

// 비회원 주문내역 보기 조회
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

// 비회원 주문 내역 수정
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

// 비회원 주문 취소
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
	brandNewOrderInfo,
	getOrderList,
	getOrderDetail,
	editOrderDetail,
	cancelOrderDetail,
	getOrderDetailForUser,
	editOrderDetailForUser,
	cancelOrderDetailForUser,
	editOrderRightASec,
};
