const categorySrvc = require("../services/categorySrvc");

const getCategoryList = async (req, res, next) => {
	try {
		const categoryList = await categorySrvc.findCategoryList();
		res.json({ result: categoryList });
	} catch (err) {
		next(err);
	}
};

const addCategory = async (req, res, next) => {
	try {
		const categoryNewData = req.body;
		const newCategory = await categorySrvc.createCategory(categoryNewData);

		res.json({ result: newCategory });
	} catch (err) {
		next(err);
	}
};

const editCategory = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const categoryNewData = req.body;
		const editedCategory = await categorySrvc.updateCategory(
			_id,
			categoryNewData,
		);
		res.json({ result: editedCategory });
	} catch (err) {
		next(err);
	}
};
const removeCategory = async (req, res, next) => {
	try {
		const { _id } = req.params;
		await categorySrvc.deleteCategory(_id);
		res.json({ message: "카테고리 삭제가 완료되었습니다." });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getCategoryList,
	addCategory,
	editCategory,
	removeCategory,
};
