const { Image, Product, Brand, Category, Order } = require("../db/model/index");

const orderListsTakeout = async () => {
	try {
		const result = await Order.find({});
		if (!result) {
			throw new Error("주문 목록을 불러올 수 없습니다");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const orderDetailsGet = async (shortId) => {
	try {
		const result = await Order.findOne({ shortId });
		if (!result) {
			throw new Error("해당하는 주문 정보가 없습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const orderDetilasEdit = async (shortId, newOrderDetails) => {
	try {
		const { userId, extraUserId, productId, shippingAddress, shippingStatus } =
			newOrderDetails;

		const result = await Order.findOneAndUpdate(
			{ shortId },
			{ userId, extraUserId, productId, shippingAddress, shippingStatus },
			{ new: true },
		);
		if (!result) {
			throw new Error("상품 정보 업데이트에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	orderDetailsGet,
	orderDetilasEdit,
};
