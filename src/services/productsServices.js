const { Image, Product } = require("../db/model/index");

const imageUploadMongo = async (location) => {
	try {
		const imgUrl = location;
		const savedImage = await Image.create({
			image: imgUrl,
		});
		return savedImage;
	} catch (err) {
		throw new Error(err);
	}
};

const productInfoUpload = async (productData) => {
	try {
		const { title, stock, price, category, brand, description } = productData;
		if (!title || !price || !category || !brand) {
			throw new Error("필수 입력 정보를 확인하세요");
		}
		const newProduct = await Product.create({
			title,
			stock,
			price,
			category,
			brand,
			description,
		});
		return newProduct;
	} catch (err) {
		throw new Error(err);
	}
};

const productInfoEdit = async (shortId, productNewData) => {
	try {
		const { title, stock, price, category, brand, description } =
			productNewData;
		const result = await Product.findOneAndUpdate(
			{ shortId },
			{ title, stock, price, category, brand, description },
			{ new: true }, // 이것 떄문에 고생함
		);
		if (!result) {
			throw new Error("상품 정보 업데이트에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const productInfoDelete = async (shortId) => {
	try {
		const result = await Product.findOneAndDelete({ shortId });
		if (!result) {
			throw new Error("상품 삭제에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	imageUploadMongo,
	productInfoUpload,
	productInfoEdit,
	productInfoDelete,
};
