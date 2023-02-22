const { Category, Product } = require("../db/model/index");

const findCategoryList = async () => {
	try {
		const categoryList = await Category.find({});
		if (!categoryList) {
			throw new Error("카테고리 목록이 없습니다.");
		}
		return categoryList;
	} catch (err) {
		throw new Error(err);
	}
};

const findProductByCategory = async (categories) => {
	try {
		if (categories === "all") {
			const productList = await Product.find({})
				.populate("productCategory")
				.populate("productBrand")
				.limit(100);
			return productList;
		}
		const targetCategory = await Category.find({ categoryName: categories });
		const productList = await Product.find({
			productCategory: targetCategory,
		})
			.populate("productCategory")
			.populate("productBrand")
			.limit(100);

		// 페이지 네이션
		// const page = Number(parameter.page || 1);
		// const perPage = Number(parameter.perPage || 100);
		// const [total, productList] = await Promise.all([
		// 	productList.countDocuments({}),
		// 	productList.find({})
		// 		.populate("productBrand")
		// 		.skip(perPage * (page - 1))
		// 		.limit(perPage),
		// ]);
		// const totalPage = Math.ceil(total / perPage);

		if (!productList) {
			throw new Error("해당 카테고리가 등록되어있지 않습니다");
		}
		return productList;
	} catch (err) {
		throw new Error(err);
	}
};

const createCategory = async (categoryNewData) => {
	try {
		const { categoryName } = categoryNewData;
		if (!categoryName) {
			throw new Error("카테고리 이름을 확인하세요");
		}
		const isExist = await Category.findOne({ categoryName });
		if (isExist) {
			throw new Error("동일한 카테고리가 이미 존재하여 등록할 수 없습니다.");
		}
		const newCategory = await Category.create({
			categoryName,
		});
		return newCategory;
	} catch (err) {
		throw new Error(err);
	}
};

const updateCategory = async (categoryName, categoryNewData) => {
	try {
		const isExist = await Category.findOne({ categoryName: categoryName });
		if (isExist.categoryName === categoryNewData.categoryName) {
			throw new Error("동일한 카테고리가 이미 존재합니다.");
		}
		isExist.categoryName = categoryNewData.categoryName;
		await isExist.save();
		return isExist;
	} catch (err) {
		throw new Error(err);
	}
};

const deleteCategory = async (categoryName) => {
	try {
		const deletedCategory = await Category.findOneAndDelete({ categoryName });
		if (!deletedCategory) {
			throw new Error(
				"이미 없는 카테고리이거나 카테고리 삭제에 문제가 있습니다.",
			);
		}
		return deletedCategory;
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	findCategoryList,
	findProductByCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};
