const categorySrvc = require("../services/categorySrvc");
const { route } = require("./routes");

const getCategoryList = async (req, res, next) => {
	try {
		const categoryList = await categorySrvc.findCategoryList();
		res.json({ result: categoryList });
	} catch (err) {
		next(err);
	}
};

const getProductByCategory = async (req, res, next) => {
	try {
		const { categories } = req.query;
		const foundProduct = await categorySrvc.findProductByCategory(categories);
		res.json({ result: foundProduct });
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
		const { categoryName } = req.params;
		const categoryNewData = req.body;
		const editedCategory = await categorySrvc.updateCategory(
			categoryName,
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
	getProductByCategory,
	addCategory,
	editCategory,
	removeCategory,
};
