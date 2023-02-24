const { Brand, Category, Product } = require("../db/model/index");
const asideFilter = require("../utils/asideFilter");

// 유저, 어드민 페이지 목록 조회
const findProductList = async () => {
	try {
		const productList = await Product.find({})
			.populate("productBrand")
			.populate("productCategory")
			.limit(100);

		if (!productList) {
			throw new Error("상품의 목록을 불러올 수 없습니다.");
		}
		return productList;
	} catch (err) {
		throw new Error(err);
	}
};

const findProductListByQuery = async (categories, brand) => {
	try {
		// category는 문자열, 브랜드는 배열
		if (categories === "all") {
			if (brand[0] !== "all") {
				if (!Array.isArray(brand)) {
					brand = [brand];
				}
				console.log("브랜드");
				console.log(brand);
				console.log("브랜드");
				const brandId = await Promise.all(
					brand.map(async (i) => {
						const findProduct = await Brand.findOne({ brandName: i });
						const id = findProduct._id;
						return id;
					}),
				);
				console.log("브랜드아디"); // {id, id}
				console.log(brandId); // {id, id}
				console.log("브랜드아디"); // {id, id}
				const productResult = await Product.find({
					productBrand: {
						// $in: ["63f250dda5cdc0fdb6f13e1a", "63f250dda5cdc0fdb6f13e0e"],
						$in: brandId,
					},
				})
					.populate("productBrand")
					.populate("productCategory")
					.limit(100);
				console.log("여기2 all/brand"); // 성공
				return productResult;
			}
			const allProduct = await Product.find({})
				.populate("productCategory")
				.populate("productBrand")
				.limit(100);
			console.log("여기1 all/all"); // 성공
			return allProduct;
		}
		// categories !== all
		// console.log("카테고리스 입력");
		// console.log(categories); // outer
		// console.log("카테고리스 입력");
		const categoryId = await Category.findOne({ categoryName: categories });
		// console.log("카테고리아디");
		// console.log(categoryId);
		// console.log("카테고리아디");
		const foundProduct = await Product.find({
			productCategory: categoryId._id,
		})
			.populate("productCategory")
			.populate("productBrand")
			.limit(100);
		// console.log("파운드프로덕트");
		// console.log(foundProduct);
		// console.log("파운드프로덕트");
		if (brand[0] !== "all") {
			if (!Array.isArray(brand)) {
				brand = [brand];
			}
			// console.log("브랜드 입력?");
			// console.log(brand); //[ 'Dior' ]
			// console.log("브랜드 입력?");
			const brandId = await Promise.all(
				brand.map(async (i) => {
					const findProduct = await Brand.findOne({ brandName: i });
					const id = findProduct._id;
					return id;
				}),
			);
			// console.log("브랜드아이디");
			// console.log(brandId); //[ new ObjectId("63f250dda5cdc0fdb6f13e1a") ]
			// console.log("브랜드아이디");
			const productResult = await Product.find({
				productBrand: { $in: brandId },
				// productCategory: { $in: foundProduct },
				productCategory: { $in: categoryId._id },
			})
				.populate("productBrand")
				.populate("productCategory")
				.limit(100);
			console.log("여기3 cat/bran");
			return productResult;
		}
		console.log("여기4 cat/all"); // 성공
		return foundProduct;
	} catch (err) {
		throw new Error(err);
	}
};

// 어드민 상품 목록 추가
const createProduct = async (location, body) => {
	try {
		const {
			productTitle,
			productStock,
			productPrice,
			productCategory,
			productBrand,
			productDescription,
			productDetail,
		} = body;
		if (
			!productTitle ||
			!productPrice ||
			!productCategory ||
			!productBrand ||
			!productDescription ||
			!productDetail
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
			productDetail,
		});
		return createdProduct;
	} catch (err) {
		throw new Error(err);
	}
};

// 유저, 어드민 상품 상세 조회
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

// 어드민 상품 상세 수정
const updateProduct = async (_id, body, location) => {
	try {
		const {
			productTitle,
			productStock,
			productPrice,
			productCategory,
			productBrand,
			productDescription,
			productDetail,
		} = body;
		if (
			!productTitle ||
			!productPrice ||
			!productCategory ||
			!productBrand ||
			!productDescription ||
			!productDetail
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
				productDetail,
				productImage: beUpdatedNewImage,
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

// 어드민 상품 삭제
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
	findProductListByQuery,
};

// 페이지 네이션
// const page = Number(parameter.page || 1);
// const perPage = Number(parameter.perPage || 100);
// const [total, productList] = await Promise.all([
// 	ProductList.countDocuments({}),
// 	ProductList.find({})
// 		.populate("productCategory")
// 		.skip(perPage * (page - 1))
// 		.limit(perPage),
// ]);
// const totalPage = Math.ceil(total / perPage);
