//코드 변경
const { Product, Order, User } = require("../db/model/index");
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
const findOrderDetail = async (orderId) => {
	try {
		const oneOrder = await Order.findById({ _id: orderId });
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
const updateOrderDetail = async (orderId, newOrderDetail) => {
	try {
		const {
			orderNumber,
			email,
			name,
			phoneNumber,
			shipStatus,
			shipAdr,
			shipNote,
			cancelNote,
		} = newOrderDetail;
		const updatedOrderDetail = await Order.findOneAndUpdate(
			{ _id: orderId },
			{
				orderNumber,
				email,
				name,
				phoneNumber,
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
const closedOrderDetail = async (orderId, body) => {
	try {
		const targetOrder = await Order.findById({ _id: orderId });

		if (!targetOrder) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		const orderClosingResult = await Order.findOneAndUpdate(
			{ _id: orderId },
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
			phoneNumber,
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

		if (!email) {
			throw new Error("주문 결제페이지: 배송지에 이메일을 입력해주세요 ");
		}

		const emailDBCheck = await User.findOne({ email });
		const brandNewOrederNum = issueOrderNum();
		// 비회원 신규주문 회원생성
		if (!emailDBCheck) {
			const newUser = await User.create({
				email,
				orderNumber: brandNewOrederNum,
			});
			const newOrder = await Order.create({
				email,
				name,
				phoneNumber,
				shipStatus,
				shipAdr,
				shipNote,
				products,
				totalPrice,
				// cancelNote,
				userId: newUser,
				orderNumber: brandNewOrederNum,
			});

			return newOrder;
		}

		const newOrder = await Order.create({
			email,
			name,
			phoneNumber,
			shipStatus,
			shipAdr,
			shipNote,
			products,
			totalPrice,
			// cancelNote,
			userId: emailDBCheck._id,
			orderNumber: brandNewOrederNum,
		});

		const newOrderNumber = newOrder.orderNumber;
		emailDBCheck.orderNumber = [...emailDBCheck.orderNumber, newOrderNumber];
		emailDBCheck.email = email;
		emailDBCheck.phoneNumber = phoneNumber;
		emailDBCheck.name = name;
		emailDBCheck.shipAdr = shipAdr;
		emailDBCheck.shipNote = shipNote;

		await emailDBCheck.save();
		return newOrder;
	} catch (err) {
		throw new Error(err);
	}
};

// 주문 후 즉시 주문 내역 수정
const editOrder = async (orderId, body) => {
	try {
		const { email, name, phoneNumber, shipAdr, shipNote } = body;
		if (!email) {
			throw new Error("");
		}
		const targetOrder = await Order.findById({ _id: orderId });
		if (targetOrder.shipStatus !== "주문접수") {
			throw new Error("현재 수정할 수 없습니다.");
		}

		targetOrder.email = email;
		targetOrder.name = name;
		targetOrder.phoneNumber = phoneNumber;
		targetOrder.shipAdr = shipAdr;
		targetOrder.shipNote = shipNote;
		await targetOrder.save();

		return targetOrder;
	} catch (err) {
		throw new Error(err);
	}
};

// 주문 후 즉시 주문 내역 취소
const cancelOrder = async (orderId, body) => {
	try {
		const { cancelNote } = body;
		const targetOrder = await Order.findById({ _id: orderId });
		if (targetOrder.shipStatus == "배송중") {
			throw new Error("현재 취소할 수 없습니다.");
		}

		targetOrder.products.forEach(async (i) => {
			const targetProduct = await Product.findOne({
				productTtile: i.productTtile,
			});

			targetProduct.productStock += i.productQuantity;
			await targetProduct.save();
		});

		targetOrder.shipStatus = "주문 취소";
		targetOrder.cancelNote = cancelNote;

		await targetOrder.save();

		return targetOrder;
	} catch (err) {
		throw new Error(err);
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
		const { email, name, phoneNumber, shipAdr, shipNote } = editOrderInfo;
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
		if (targetOrder.shipStatus !== "주문접수") {
			throw new Error("현재 수정할 수 없습니다.");
		}

		targetOrder.email = email;
		targetOrder.name = name;
		targetOrder.phoneNumber = phoneNumber;
		targetOrder.shipAdr = shipAdr;
		targetOrder.shipNote = shipNote;
		await targetOrder.save();

		return targetOrder;
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

		if (targetOrder.shipStatus == "배송중") {
			throw new Error("현재 취소할 수 없습니다.");
		}

		targetOrder.products.forEach(async (i) => {
			const targetProduct = await Product.findOne({
				productTtile: i.productTtile,
			});

			targetProduct.productStock += i.productQuantity;
			await targetProduct.save();
		});

		targetOrder.shipStatus = "주문 취소";
		targetOrder.cancelNote = cancelNote;

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
