import {
	findCategoryList,
	createCategory,
	updateCategory,
	deleteCategory,
} from "../services/categorySrvc";

// 카테고리 목록 조회
const getCategoryList = async (req, res, next) => {
	try {
		const categoryList = await findCategoryList();
		res.json({ result: categoryList });
	} catch (err) {
		next(err);
	}
};

// 카테고리 추가
const addCategory = async (req, res, next) => {
	try {
		const categoryNewData = req.body;
		const newCategory = await createCategory(categoryNewData);
		res.json({ result: newCategory });
	} catch (err) {
		next(err);
	}
};

// 카테고리 수정
const editCategory = async (req, res, next) => {
	try {
		const { categoryName } = req.params;
		const categoryNewData = req.body;
		const editedCategory = await updateCategory(categoryName, categoryNewData);
		res.json({ result: editedCategory });
	} catch (err) {
		next(err);
	}
};

// 카테고리 삭제
const removeCategory = async (req, res, next) => {
	try {
		const _id = req.params.categoryName;
		await deleteCategory(_id);
		res.json({ message: "카테고리 삭제가 완료되었습니다." });
	} catch (err) {
		next(err);
	}
};

export default {
	getCategoryList,
	addCategory,
	editCategory,
	removeCategory,
};
