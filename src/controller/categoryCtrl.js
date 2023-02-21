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
		const { shortId } = req.params;
		const categoryNewData = req.body;
		const editedCategory = await categorySrvc.updateCategory(
			shortId,
			categoryNewData,
		);
		res.json({ result: editedCategory });
	} catch (err) {
		next(err);
	}
};
const removeCategory = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		await categorySrvc.deleteCategory(shortId);
		res.json({ result: "카테고리 삭제가 완료되었습니다." });
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
