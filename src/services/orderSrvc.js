const { Order } = require("../db/model/index");

const createOrder = async (orderData, newUser) => {
	try {
		const { email, name, phone, shipAdr, ShipNote, products } = orderData;

		const newOrder = await Order.create({
			email,
			name,
			phone,
			shipAdr,
			ShipNote,
			shipStatus: "주문 완료",
			products,
			userId: newUser,
			orderNumber: newUser.orderNumber,
		});
		return newOrder;
	} catch (err) {
		throw new Error(err);
	}
};

const findOrderList = async () => {
	try {
		const orderList = await Order.find({});
		if (!orderList) {
			throw new Error("주문 목록을 불러올 수 없습니다");
		}
		return orderList;
	} catch (err) {
		throw new Error(err);
	}
};

const findOrderDetail = async (_id) => {
	try {
		const result = await Order.findOne({ _id });
		if (!result) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const updateOrderDetail = async (_id, newOrderDetail) => {
	try {
		const { orderNumber, email, name, phone, shipStatus, shipAdr, shipNote } =
			newOrderDetail;

		const updatedOrderDetail = await Order.findOneAndUpdate(
			{ _id },
			{ orderNumber, email, name, phone, shipStatus, shipAdr, shipNote },
			{ new: true },
		);
		if (!updatedOrderDetail) {
			throw new Error("주문 정보 업데이트에 오류가 있습니다.");
		}
		return updatedOrderDetail;
	} catch (err) {
		throw new Error(err);
	}
};

const closedOrderDetail = async (_id) => {
	try {
		const orderClosingResult = await Order.findOneAndUpdate(
			{ _id },
			{
				shipStatus: "주문 취소",
			},
		);
		if (!orderClosingResult) {
			throw new Error("주문 취소에 오류가 있습니다.");
		}
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = {
	createOrder,
	findOrderList,
	findOrderDetail,
	updateOrderDetail,
	closedOrderDetail,
};
