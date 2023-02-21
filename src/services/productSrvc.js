const { Brand, Category, Product } = require("../db/model/index");

const findProductList = async () => {
	try {
		const productList = await Product.find({})
			.populate("productBrand")
			.populate("productCategory")
			.limit(100)
			.sort({ createdAt: -1 });
		// 무한 스크롤 해야함
		if (!productList) {
			throw new Error("상품의 목록을 불러올 수 없습니다.");
		}
		return productList;
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
		if (
			!productTitle ||
			!productPrice ||
			!productCategory ||
			!productBrand ||
			!productDescription
		) {
			throw new Error("필수 입력 정보를 확인하세요");
		}

		if (isNaN(productPrice) || parseInt(productPrice) < 0) {
			throw new Error("알맞은 가격을 입력해주세요");
		}
		if (isNaN(productStock) || parseInt(productStock) < 0) {
			throw new Error("알맞은 수량을 입력해주세요");
		}
		const imgUrlArray = location.map((img) => img.location);
		if (!imgUrlArray) {
			throw new Error("상품의 이미지를 등록해주세요");
		}
		const isBrandExist = await Brand.findOne({ brandName: productBrand });
		if (!isBrandExist) {
			throw new Error("해당 브랜드를 먼저 등록해주세요");
		}
		const isCategoryExist = await Category.findOne({
			categoryName: productCategory,
		});
		if (!isCategoryExist) {
			throw new Error("해당 카테고리를 먼저 등록해주세요");
		}
		const isProductExist = await Product.findOne({ productTitle });
		if (isProductExist) {
			throw new Error("동일한 상품명이 이미 등록되어 있습니다");
		}
		const createdProduct = await Product.create({
			productTitle,
			productStock,
			productPrice,
			productCategory: isCategoryExist,
			productBrand: isBrandExist,
			productImage: imgUrlArray,
			productDescription,
		});
		return createdProduct;
	} catch (err) {
		throw new Error(err);
	}
};

const findProduct = async (_id) => {
	try {
		const foundProduct = await Product.findById({ _id })
			.populate("productBrand")
			.populate("productCategory");
		if (!foundProduct) {
			throw new Error("상품의 정보를 조회할 수 없습니다.");
		}
		return foundProduct;
	} catch (err) {
		throw new Error(err);
	}
};

const updateProduct = async (_id, body, location) => {
	try {
		const {
			productTitle,
			productStock,
			productPrice,
			productCategory,
			productBrand,
			productDescription,
		} = body;
		if (
			!productTitle ||
			!productPrice ||
			!productCategory ||
			!productBrand ||
			!productDescription
		) {
			throw new Error("필수 입력 정보를 확인하세요");
		}

		if (isNaN(productPrice) || parseInt(productPrice) < 0) {
			throw new Error("알맞은 가격을 입력해주세요");
		}
		if (isNaN(productStock) || parseInt(productStock) < 0) {
			throw new Error("알맞은 수량을 입력해주세요");
		}
		const beUpdatedNewImage = location.map((img) => img.location);
		if (!beUpdatedNewImage) {
			throw new Error("상품의 이미지를 등록해주세요");
		}
		const isBrandExist = await Brand.findOne({ brandName: productBrand });
		if (!isBrandExist) {
			throw new Error("해당 브랜드를 먼저 등록해주세요");
		}
		const isCategoryExist = await Category.findOne({
			categoryName: productCategory,
		});
		if (!isCategoryExist) {
			throw new Error("해당 카테고리를 먼저 등록해주세요");
		}
		const isProductExist = await Product.findOne({ productTitle });
		if (isProductExist) {
			throw new Error("동일한 상품명이 이미 등록되어 있습니다");
		}
		const updatedProduct = await Product.findOneAndUpdate(
			{ _id },
			{
				productTitle,
				productStock,
				productPrice,
				productCategory: isCategoryExist,
				productBrand: isBrandExist,
				productDescription,
				productImage: location,
			},
			{ new: true },
		);

		if (!updatedProduct) {
			throw new Error(
				"상품을 업데이트 할 수 없습니다. 필수 입력 정보를 확인해주세요",
			);
		}
		return updatedProduct;
	} catch (err) {
		throw new Error(err);
	}
};

const deleteProduct = async (_id) => {
	try {
		const deletedProduct = await Product.findOneAndDelete({ _id });
		if (!deletedProduct) {
			throw new Error("상품 삭제에 오류가 있습니다.");
		}
		return deletedProduct;
		// 삭제 요청한 상품에 대해서 데이터를 남겨둘 필요성을 말해봐라
		// deleted 로 메시지를 남겨두고 로그를 살릴것인가?
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	findProductList,
	createProduct,
	findProduct,
	updateProduct,
	deleteProduct,
};
