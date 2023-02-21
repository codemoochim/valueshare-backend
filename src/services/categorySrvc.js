const { Category } = require("../db/model/index");

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

const updateCategory = async (_id, categoryNewData) => {
	try {
		const { categoryName } = categoryNewData;
		const isExist = await Category.findOne({ categoryName });
		if (isExist) {
			throw new Error("동일한 카테고리가 이미 존재하여 수정할 수 없습니다.");
		}
		const updatedCategory = await Category.findOneAndUpdate(
			{ _id },
			{ categoryName },
			{ new: true },
		);
		if (!updatedCategory) {
			throw new Error("카테고리 정보 업데이트에 오류가 있습니다.");
		}
		return updatedCategory;
	} catch (err) {
		throw new Error(err);
	}
};

const deleteCategory = async (_id) => {
	try {
		const deletedCategory = await Category.findOneAndDelete({ _id });
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
	createCategory,
	updateCategory,
	deleteCategory,
};
