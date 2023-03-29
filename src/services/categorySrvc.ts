import { Category } from "../db/model/index";

// 카테고리 목록 조회
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

// 카테고리 생성
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

// 카테고리 수정
const updateCategory = async (categoryName, categoryNewData) => {
	try {
		const isExist = await Category.findOne({ categoryName: categoryName });
		if (isExist.categoryName === categoryNewData.categoryName) {
			throw new Error("동일한 카테고리가 이미 존재합니다.");
		}
		const newCate = categoryNewData.categoryName;
		isExist.categoryName = newCate;
		await isExist.save();
		return isExist;
	} catch (err) {
		throw new Error(err);
	}
};

// 카테고리 삭제
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
export default {
	findCategoryList,
	createCategory,
	updateCategory,
	deleteCategory,
};
