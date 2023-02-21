const { Product } = require("../db/model/index");

const findProduct = async (shortId) => {
	try {
		const product = await Product.find({ shortId });
		if (!product) {
			throw new Error("상품의 정보를 조회할 수 없습니다.");
		}
		return product;
	} catch (err) {
		throw new Error(err);
	}
};

const findProductList = async () => {
	try {
		const product = await Product.find({});
		if (!product) {
			throw new Error("상품의 목록을 불러올 수 없습니다.");
		}
		return product;
	} catch (err) {
		throw new Error(err);
	}
};

const createProduct = async (location, body) => {
	try {
		const {
			productTitle,
			productStock,
			productPrice,
			productCategory,
			productBrand,
			productDescription,
		} = body;
		if (!productTitle || !productPrice || !productCategory || !productBrand) {
			throw new Error("필수 입력 정보를 확인하세요");
		}
		const imgUrlArray = location.map((img) => img.location);
		if (!imgUrlArray) {
			throw new Error("상품의 이미지를 등록해주세요");
		}
		const result = await Product.create({
			productTitle,
			productStock,
			productPrice,
			productCategory,
			productBrand,
			productImage: imgUrlArray,
			productDescription,
		});
		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const updateProduct = async (shortId, productNewData, productNewImage) => {
	try {
		const {
			productTitle,
			productStock,
			productPrice,
			productCategory,
			productBrand,
			productDescription,
		} = productNewData;
		const result = await Product.findOneAndUpdate(
			{ shortId },
			{
				productTitle,
				productStock,
				productPrice,
				productCategory,
				productBrand,
				productDescription,
				productImage: productNewImage,
			},
			{ new: true },
		);
		if (!result) {
			throw new Error("상품을 업데이트 할 수 없습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const deleteProduct = async (shortId) => {
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
	createProduct,
	findProduct,
	findProductList,
	updateProduct,
	deleteProduct,
};
