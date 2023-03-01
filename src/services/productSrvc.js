const mongoose = require("mongoose");
const { Schema } = mongoose;

const { Brand, Category, Product } = require("../db/model/index");

// 유저, 어드민 페이지 상품 목록 조회
const findProductList = async () => {
	try {
		const productList = await Product.find({})
			.populate("productBrand")
			.populate("productCategory")
			.limit(20)
			.sort({ createdAt: -1 });

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
						$in: brandId,
					},
				})
					.populate("productBrand")
					.populate("productCategory")
					.limit(20);
				console.log("여기2 all/brand"); // 성공
				return productResult;
			}
			const allProduct = await Product.find({})
				.populate("productCategory")
				.populate("productBrand")
				.limit(20);
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
			.limit(20);
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
				.limit(20);
			console.log("여기3 cat/bran");
			return productResult;
		}
		console.log("여기4 cat/all"); // 성공
		return foundProduct;
	} catch (err) {
		throw new Error(err);
	}
};

// 어드민 상품 추가
const createProduct = async (location, body) => {
	try {
		// if (isNaN(productPrice) || parseInt(productPrice) < 0) {
		// 	throw new Error("알맞은 가격을 입력해주세요");
		// }
		// if (isNaN(productStock) || parseInt(productStock) < 0) {
		// 	throw new Error("알맞은 수량을 입력해주세요");
		// }
		const imgUrlArray = location.map((img) => img.location);
		// if (!imgUrlArray) {
		// 	throw new Error("상품의 이미지를 등록해주세요");
		// }
		// 브랜드 확인
		const isBrandExist = await Brand.findOne({ brandName: body?.productBrand });
		if (!isBrandExist) {
			throw new Error("해당 브랜드를 먼저 등록해주세요");
		}
		// 카테고리 확인
		const isCategoryExist = await Category.findOne({
			categoryName: body?.productCategory,
		});
		if (!isCategoryExist) {
			throw new Error("해당 카테고리를 먼저 등록해주세요");
		}
		// 상품명 중복 확인
		const isProductExist = await Product.findOne({
			productTitle: body?.productTitle,
		});
		if (isProductExist) {
			throw new Error("동일한 상품명이 이미 등록되어 있습니다");
		}
		const createdProduct1 = new Product();
		createdProduct1.productTitle = body?.productTitle;
		createdProduct1.productStock = body?.productStock;
		createdProduct1.productPrice = body?.productPrice;
		createdProduct1.productCategory = isCategoryExist;
		createdProduct1.productBrand = isBrandExist;
		createdProduct1.productImage = imgUrlArray;
		createdProduct1.productDescription = body?.productDescription;

		await createdProduct1.save();
		return createdProduct1;
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
		// 사진을 안올리면 body에 productImage '' location x 가 없어서 초기화됨
		// 사진을 올리면 body에 productImage x 필드 없음 lotcation o 필드가 없고 location 이 있음
		const updatedProduct = await Product.findById({ _id });
		console.log(11);
		console.log(body);
		console.log(11);

		const retainImage = updatedProduct.productImage;
		if (location) {
			const beUpdatedNewImage = location.map((img) => img.location);
			updatedProduct.productImage = retainImage.concat(beUpdatedNewImage);
		}
		if (body.productImage === "") {
			updatedProduct.productImage = retainImage;
		}

		for (const key of Object.keys(body)) {
			// 빈칸은 그냥 지나감. product어쭈구에서 빈칸으로 냈을 때
			// 기존 데이터를 그대로 유지시키기 위해서 if문을 걸었음
			if (body[key] !== "") {
				// 빈칸이 아니라면은 데이터를 입력했다는 말.
				//
				console.log(1);
				console.log(body.productImage);
				console.log(1);
				if (key === "productBrand") {
					const isBrandExist = await Brand.findOne({ brandName: body[key] });
					if (!isBrandExist) {
						throw new Error("해당 브랜드를 먼저 등록해주세요");
					}
					updatedProduct.productBrand = isBrandExist;
					// } else if (key === "productCategory") {
				}
				if (key === "productCategory") {
					const isExistCategory = await Category.findOne({
						categoryName: body[key],
					});
					if (!isExistCategory) {
						throw new Error("해당 카테고리 먼저 등록해주세요");
					}
					updatedProduct.productCategory = isExistCategory;
				} else {
					updatedProduct[key] = body[key];
					console.log(2);
					console.log(body.productImage);
					console.log(2);
				}
			}
		}
		await updatedProduct.save();
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
// 		.limit(20Page),
// ]);
// const totalPage = Math.ceil(total / perPage);
