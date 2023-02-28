const { Order, User } = require("../db/model/index");
const fromCheck = require("../utils/formCheck");
const issueOrderNum = require("../utils/issueOrderNum");

/***********************/
/***********************/
/******** Admin ********/
/***********************/
/***********************/
// 어드민 주문 목록 조회
const findOrderList = async () => {
	try {
		const orderList = await Order.find({}).sort({ createdAt: -1 });
		if (!orderList) {
			throw new Error("주문 목록을 불러올 수 없습니다");
		}
		return orderList;
	} catch (err) {
		throw new Error(err);
	}
};

// 어드민 주문 상세 조회
// 유저 주문 완료 후 바로 주문 내역 응답
const findOrderDetail = async (_id) => {
	try {
		const oneOrder = await Order.findById({ _id });
		if (!oneOrder) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		const { products } = oneOrder;
		return [oneOrder, products];
	} catch (err) {
		throw new Error(err);
	}
};

// 어드민 주문 내역 수정
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

// 어드민 주문 취소
const closedOrderDetail = async (_id, body) => {
	try {
		const targetOrder = await Order.findById({ _id });

		if (!targetOrder) {
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

/***********************/
/***********************/
/********* User ********/
/***********************/
/***********************/

// 유저 주문 내역 생성
const createOrder = async (orderData) => {
	try {
		const {
			email,
			name,
			phone,
			shipAdr,
			shipNote,
			products,
			totalPrice,
			shipStatus,
			cancelNote,
		} = orderData;
		products.forEach((i) => {
			i.productBrand = i.productBrand.brandName;
			i.productQuantity = i.quantity;
		});

		if (!email || !name || !phone || !shipAdr || !shipNote) {
			throw new Error("필수입력 정보를 확인하세요");
		}

		if (!fromCheck.emailFormCheck(email)) {
			throw new Error("이메일의 형식을 확인하세요");
		}

		const emailDBCheck = await User.findOne({ email });
		const brandNewOrederNum = issueOrderNum();
		if (!emailDBCheck) {
			// 신규주문 회원생성
			const newUser = await User.create({
				email,
				orderNumber: brandNewOrederNum,
			});
			const newOrder = await Order.create({
				email,
				name,
				phone,
				shipAdr,
				shipNote,
				shipStatus,
				products,
				totalPrice,
				// cancelNote,
				userId: newUser,
				orderNumber: brandNewOrederNum,
			});
			return newOrder;
		} else {
			const newOrder = await Order.create({
				email,
				name,
				phone,
				shipAdr,
				shipNote,
				shipStatus,
				products,
				totalPrice,
				// cancelNote,
				userId: emailDBCheck._id,
				orderNumber: brandNewOrederNum,
			});

			const newOrderNumber = newOrder.orderNumber;
			emailDBCheck.orderNumber = [...emailDBCheck.orderNumber, newOrderNumber];
			await emailDBCheck.save();
			return newOrder;
		}
	} catch (err) {
		throw new Error(err);
	}
};

// 주문 후 즉시 주문 내역 수정
const editOrder = async (_id, body) => {
	try {
		const { email, name, phone, shipAdr, shipNote } = body;
		if (!email) {
			throw new Error("");
		}
		const targetOrder = await Order.findOneAndUpdate(
			{ _id },
			{
				email,
				name,
				phone,
				shipAdr,
				shipNote,
			},
			{ new: true },
		);
		return targetOrder;
	} catch (err) {
		throw new Error("주문을 수정할 수 없습니다");
	}
};

// 주문 후 즉시 주문 내역 취소
const cancelOrder = async (_id, body) => {
	try {
		const { cancelNote } = body;
		const targetOrder = await Order.findOneAndUpdate(
			{ _id },
			{
				shipStatus: "주문 취소",
				cancelNote: cancelNote,
			},
			{ new: true },
		);
		return targetOrder;
	} catch (err) {
		throw new Error("주문을 수정할 수 없습니다");
	}
};

/***********************/
/***********************/
/***** 비회원 주문조회 *****/
/***********************/
/***********************/

// 비회원 주문내역 보기 조회
const findOrderDetailForUser = async (orderNumber, email) => {
	try {
		const noDash = orderNumber.replace(/-/g, "");
		const yesDash =
			noDash.slice(0, 4) +
			"-" +
			noDash.slice(4, 6) +
			"-" +
			noDash.slice(6, 8) +
			"-" +
			noDash.slice(8);
		const oneOrder = await Order.findOne({ orderNumber: yesDash });
		if (!oneOrder) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		if (oneOrder.email !== email) {
			throw new Error("이메일이 일치하지 않습니다.");
		}
		return oneOrder._id;
	} catch (err) {
		throw new Error(err);
	}
};

// 비회원 검증 후 주문 수정
const updateOrderDetailForUser = async (orderNumber, editOrderInfo) => {
	try {
		const { email, name, phone, shipAdr, shipNote } = editOrderInfo;
		const noDash = orderNumber.replace(/-/g, "");
		const yesDash =
			noDash.slice(0, 4) +
			"-" +
			noDash.slice(4, 6) +
			"-" +
			noDash.slice(6, 8) +
			"-" +
			noDash.slice(8);
		const targetOrder = await Order.findOne({ orderNumber: yesDash });

		if (!targetOrder) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		if (targetOrder.email !== email) {
			throw new Error("올바른 이메일을 입력해주세요");
		}

		const updatedOrderDetail = await Order.findOneAndUpdate(
			{ orderNumber: yesDash },
			{
				email,
				name,
				phone,
				shipAdr,
				shipNote,
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

// 비회원 검증 후 주문 취소
const closedOrderDetailForUser = async (orderNumber, body) => {
	try {
		const noDash = orderNumber.replace(/-/g, "");
		const yesDash =
			noDash.slice(0, 4) +
			"-" +
			noDash.slice(4, 6) +
			"-" +
			noDash.slice(6, 8) +
			"-" +
			noDash.slice(8);
		const targetOrder = await Order.findOne({ orderNumber: yesDash });

		if (!targetOrder) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		targetOrder.shipStatus = "주문 취소";
		await targetOrder.save();
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
	editOrder,
	cancelOrder,
};
