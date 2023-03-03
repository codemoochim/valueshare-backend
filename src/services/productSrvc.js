const { Brand, Category, Product } = require("../db/model/index");

// 어드민 상품 목록 조회
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

const findProductListByQuery = async (categories, brand, page, perPage) => {
	const pageProduct = async (condition) => {
		const result = await Product.find(condition)
			.populate("productBrand")
			.populate("productCategory")
			.skip(perPage * (page - 1))
			.limit(20);

		return result;
	};

	const countTotal = async (condition) => {
		const total = await Product.find(condition).countDocuments({});
		return total;
	};

	const responseData = async (totalPage, product) => {
		const infiniteData = {
			page: {
				totalPage,
				current: page,
				limit: 20,
			},
			products: product,
		};
		return infiniteData;
	};

	try {
		if (categories === "all") {
			if (brand[0] !== "all") {
				if (!Array.isArray(brand)) {
					brand = [brand];
				}
				const brandId = await Promise.all(
					brand.map(async (i) => {
						const findProduct = await Brand.findOne({ brandName: i });
						const id = findProduct._id;
						return id;
					}),
				);
				const selcTarget = {
					productBrand: {
						$in: brandId,
					},
				};
				const productResult = await pageProduct(selcTarget);
				const total = await countTotal(selcTarget);
				const totalPage = Math.ceil(total / perPage);

				const infiniteData = responseData(totalPage, productResult);
				console.log("여기2 all/brand"); // 성공
				console.log(total);
				return infiniteData;
			}
			// all / all
			const allProduct = await pageProduct({});

			const total = await countTotal({});
			const totalPage = Math.ceil(total / perPage);
			const infiniteData = responseData(totalPage, allProduct);
			console.log("여기1 all/all"); // 성공
			console.log(total);
			return infiniteData;
		}
		// cat / all
		const categoryId = await Category.findOne({ categoryName: categories });

		const selcTarget = {
			productCategory: categoryId._id,
		};
		if (brand[0] !== "all") {
			// cat / brand
			if (!Array.isArray(brand)) {
				brand = [brand];
			}
			const brandId = await Promise.all(
				brand.map(async (i) => {
					const findProduct = await Brand.findOne({ brandName: i });
					const id = findProduct._id;
					return id;
				}),
			);

			const selcTarget = {
				productBrand: { $in: brandId },
				productCategory: { $in: categoryId._id },
			};

			const productResult = await pageProduct(selcTarget);
			const total = await countTotal(selcTarget);

			const totalPage = Math.ceil(total / perPage);
			const infiniteData = responseData(totalPage, productResult);
			console.log(total);
			console.log("여기3 cat/bran");
			return infiniteData;
		}

		const foundProduct = await pageProduct(selcTarget);
		const total = await countTotal(selcTarget);
		const totalPage = Math.ceil(total / perPage);
		const infiniteData = responseData(totalPage, foundProduct);

		console.log("여기4 cat/all"); // 성공
		console.log(total);
		return infiniteData;
	} catch (err) {
		throw new Error(err);
	}
};

// 어드민 상품 등록
const createProduct = async (location, body) => {
	try {
		const imgUrlArray = location.map((img) => img.location);

		const checkDB = async (Model, condition) => {
			const isExist = await Model.findOne(condition);
			if (!isExist) {
				throw new Error(`입력사항을 확인해주세요`);
			}
			return isExist;
		};
		const isBrandExist = await checkDB(Brand, {
			brandName: body?.productBrand,
		});
		const isCategoryExist = await checkDB(Category, {
			categoryName: body?.productCategory,
		});

		// // 상품명 중복 확인
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
const findProduct = async (productId) => {
	try {
		const foundProduct = await Product.findById({ _id: productId })
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
const updateProduct = async (productId, body, location) => {
	try {
		const updatedProduct = await Product.findById({ _id: productId });
		const retainImage = updatedProduct.productImage;
		if (location) {
			const beUpdatedNewImage = location.map((img) => img.location);
			updatedProduct.productImage = retainImage.concat(beUpdatedNewImage);
		}
		if (body.productImage === "") {
			updatedProduct.productImage = retainImage;
		}

		for (const key of Object.keys(body)) {
			if (body[key] !== "") {
				if (key === "productBrand") {
					const isBrandExist = await Brand.findOne({ brandName: body[key] });
					if (!isBrandExist) {
						throw new Error("해당 브랜드를 먼저 등록해주세요");
					}
					updatedProduct.productBrand = isBrandExist;
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
const deleteProduct = async (productId) => {
	try {
		const deletedProduct = await Product.findOneAndDelete({ _id: productId });
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
