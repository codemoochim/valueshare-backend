const { Brand, Category, Product, User } = require("../db/model/index");

const findProductList = async () => {
	try {
		const productList = await Product.find({})
			.populate("productBrand")
			.populate("productCategory")
			.limit(100);
		// 페이지네이션 코드리뷰 요구사항
		if (!productList) {
			throw new Error("상품의 목록을 불러올 수 없습니다.");
		}
		return productList;
	} catch (err) {
		throw new Error(err);
	}
};

const createUser = async (body) => {
	try {
		const { email } = body;
		// 이메일 형식 검증
		const emailForm = new RegExp("/^[a-z0-9]+@.[a-z]{2,3}");
		if (!emailForm.test(email) || !email) {
			throw new Error("이메일의 형식을 확인해주세요");
		}

		// 비회원이 같은 이메일로 여러번 주문할 경우 주문번호를 어떻게 할것인가?
		// 그 이메일에 주문 번호 계속해서 더해줄 것인가?
		const orderNumber = () => {
			return;
		};

		// switch case 문을 써서 Order에 orderNumber 가 있는 경우 재생성, 없는 경우 사용
		const isUserExist = await User.findOne({ email });
		if (isUserExist) {
		}
		const createdUser = await User.create({
			email,
			orderNumber: () => {
				orderNumber.push(orderNumber);
			},
		});
	} catch (err) {
		throw new Error(err);
	}
	// 	const {
	// 		productTitle,
	// 		productStock,
	// 		productPrice,
	// 		productCategory,
	// 		productBrand,
	// 		productDescription,
	// 	} = body;
	// 	if (
	// 		!productTitle ||
	// 		!productPrice ||
	// 		!productCategory ||
	// 		!productBrand ||
	// 		!productDescription
	// 	) {
	// 		throw new Error("필수 입력 정보를 확인하세요");
	// 	}
	// 	if (isNaN(productPrice) || parseInt(productPrice) < 0) {
	// 		throw new Error("알맞은 가격을 입력해주세요");
	// 	}
	// 	if (isNaN(productStock) || parseInt(productStock) < 0) {
	// 		throw new Error("알맞은 수량을 입력해주세요");
	// 	}
	// 	const imgUrlArray = location.map((img) => img.location);
	// 	if (!imgUrlArray) {
	// 		throw new Error("상품의 이미지를 등록해주세요");
	// 	}
	// 	const isBrandExist = await Brand.findOne({ brandName: productBrand });
	// 	if (!isBrandExist) {
	// 		throw new Error("해당 브랜드를 먼저 등록해주세요");
	// 	}
	// 	const isCategoryExist = await Category.findOne({
	// 		categoryName: productCategory,
	// 	});
	// 	if (!isCategoryExist) {
	// 		throw new Error("해당 카테고리를 먼저 등록해주세요");
	// 	}
	// 	const isProductExist = await Product.findOne({ productTitle });
	// 	if (isProductExist) {
	// 		throw new Error("동일한 상품명이 이미 등록되어 있습니다");
	// 	}
	// 	console.log(isBrandExist);
	// 	const createdProduct = await Product.create({
	// 		productTitle,
	// 		productStock,
	// 		productPrice,
	// 		productCategory: isCategoryExist, // 여기서 isCategoryExist._id 를 넣어야 하나?
	// 		productBrand: isBrandExist,
	// 		productImage: imgUrlArray,
	// 		productDescription,
	// 	}); // 여기다 .save() 이걸 해줘야하나? exec?
	// 	const setPopulate = await Product.findById(createdProduct._id)
	// 		.populate("productBrand")
	// 		.populate("productCategory");
	// 	return setPopulate;
	// } catch (err) {
	// 	throw new Error(err);
	// }
};

const findProduct = async (shortId) => {
	try {
		const foundProduct = await Product.find({ shortId });
		if (!foundProduct) {
			throw new Error("상품의 정보를 조회할 수 없습니다.");
		}
		return foundProduct;
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
		const productNewImage = location.map((img) => img.location);
		if (!productNewImage) {
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
			{ shortId },
			{
				productTitle,
				productStock,
				productPrice,
				productCategory: isCategoryExist,
				productBrand: isBrandExist,
				productDescription,
				productImage: productNewImage,
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

const deleteProduct = async (shortId) => {
	try {
		const deletedProduct = await Product.findOneAndDelete({ shortId });
		if (!deletedProduct) {
			throw new Error("상품 삭제에 오류가 있습니다.");
		}
		return deletedProduct;
		// 상품을 삭제할것인가? 나머지 정보들을 초기화 시킨채 상품명 정도만 내비 둘것인가?
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	createUser,
	findProductList,
	findProduct,
	updateProduct,
	deleteProduct,
};
