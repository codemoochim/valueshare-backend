const { Brand, Product } = require("../db/model/index");

const findBrandList = async () => {
	try {
		const brandList = await Brand.find({});
		return brandList;
	} catch (err) {
		throw new Error(err);
	}
};

const findProductByBrand = async (brand) => {
	try {
		const targetBrand = await Brand.find({ brandName: brand });
		const productList = await Product.find({
			productBrand: targetBrand,
		})
			.populate("productCategory")
			.populate("productBrand")
			.limit(100);

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

		if (!productList) {
			throw new Error("해당 브랜드가 등록되어있지 않습니다");
		}

		return productList;
	} catch (err) {
		throw new Error(err);
	}
};

const createBrand = async (brandNewData) => {
	try {
		const { brandName } = brandNewData;
		if (!brandName) {
			throw new Error("필수 입력 정보를 확인하세요");
		}
		const isExist = await Brand.findOne({ brandName });
		if (isExist) {
			throw new Error("동일한 브랜드가 이미 존재합니다.");
		}
		const newBrand = await Brand.create({
			brandName,
		});
		return newBrand;
	} catch (err) {
		throw new Error(err);
	}
};

const updateBrand = async (_id, brandNewData) => {
	try {
		const { brandName } = brandNewData;
		const result = await Brand.findOneAndUpdate(
			{ _id },
			{ brandName },
			{ new: true },
		);
		if (!result) {
			throw new Error("브랜드 정보 업데이트에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const deleteBrand = async (_id) => {
	try {
		const result = await Brand.findOneAndDelete({ _id });
		if (!result) {
			throw new Error("브랜드 삭제에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	findBrandList,
	findProductByBrand,
	createBrand,
	updateBrand,
	deleteBrand,
};
