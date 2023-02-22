const { Order } = require("../db/model/index");

const createOrder = async (orderData, newUser) => {
	try {
		const {
			email,
			name,
			phone,
			shipAdr,
			ShipNote,
			products,
			totalPrice,
			cancelNote,
		} = orderData;

		const newOrder = await Order.create({
			email,
			name,
			phone,
			shipAdr,
			ShipNote,
			shipStatus,
			products,
			totalPrice,
			cancelNote,
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

const findOrderDetail = async (_id, body) => {
	try {
		const oneOrder = await Order.findOne({ _id });
		if (!oneOrder) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		return oneOrder;
	} catch (err) {
		throw new Error(err);
	}
};

const findOrderDetailForUser = async (_id, body) => {
	try {
		const oneOrder = await Order.findOne({ _id });
		if (!oneOrder) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		if (oneOrder.email !== body.eamil) {
			throw new Error("올바른 이메일을 입력해주세요");
		}
		if (oneOrder.orderNumber !== body.orderNumber) {
			throw new Error("올바른 주문번호를 입력해주세요");
		}
		return oneOrder;
	} catch (err) {
		throw new Error(err);
	}
};

const updateOrderDetail = async (_id, newOrderDetail) => {
	try {
		const {
			orderNumber,
			email,
			name,
			phone,
			shipStatus,
			shipAdr,
			shipNote,
			cancelNote,
		} = newOrderDetail;
		const updatedOrderDetail = await Order.findOneAndUpdate(
			{ _id },
			{
				orderNumber,
				email,
				name,
				phone,
				shipStatus,
				shipAdr,
				shipNote,
				cancelNote,
			},
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
const updateOrderDetailForUser = async (_id, newOrderDetail) => {
	try {
		const { email, name, phone, shipAdr, shipNote, orderNumber } =
			newOrderDetail;
		const accessValid = await Order.findById({ _id });

		if (!accessValid) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		if (accessValid.email !== email) {
			throw new Error("올바른 이메일을 입력해주세요");
		}
		console.log(accessValid);
		console.log(orderNumber);
		if (accessValid.orderNumber !== orderNumber) {
			throw new Error("올바른 주문번호를 입력해주세요");
		}
		const updateInfo = new accessValid();
		console.log(updateInfo);
		// const updatedOrderDetail = await Order.findOneAndUpdate(
		// 	{ _id },
		// 	{
		// 		email,
		// 		name,
		// 		phone,
		// 		shipAdr,
		// 		shipNote,
		// 	},
		// 	{ new: true },
		// );

		// if (!updatedOrderDetail) {
		// 	throw new Error("주문 정보 업데이트에 오류가 있습니다.");
		// }

		// return updatedOrderDetail;
	} catch (err) {
		throw new Error(err);
	}
};

const closedOrderDetail = async (_id, body) => {
	try {
		const accessValid = await Order.findById({ _id });

		if (!accessValid) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
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
const closedOrderDetailForUser = async (_id, body) => {
	try {
		const accessValid = await Order.findById({ _id });

		if (!accessValid) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		if (accessValid.email !== body.email) {
			throw new Error("올바른 이메일을 입력해주세요");
		}
		if (accessValid.orderNumber !== body.orderNumber) {
			throw new Error("올바른 주문번호를 입력해주세요");
		}

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
	findOrderDetailForUser,
	updateOrderDetailForUser,
	closedOrderDetailForUser,
};
