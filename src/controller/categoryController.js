const categoriesServices = require("../services/categoryServices");

const getCategories = async (req, res, next) => {
	try {
		const categorylists = await categoriesServices.getCategoryLists();
		res.json({ data: categorylists });
	} catch (err) {
		next(err);
	}
};

const addCategories = async (req, res, next) => {
	try {
		const categoryData = req.body;
		console.log(categoryData);
		const newCategory = await categoriesServices.categoryAdd(categoryData);

		res.json({ data: newCategory });
	} catch (err) {
		next(err);
	}
};

const editCategories = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		const categoryNewData = req.body;
		const editedProduct = await categoriesServices.categoryInfoEdit(
			shortId,
			categoryNewData,
		);
		res.json({ data: editedProduct });
	} catch (err) {
		next(err);
	}
};
const deleteCategories = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		await categoriesServices.categoryInfoDelete(shortId);
		res.json({ message: "delete completed" });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getCategories,
	addCategories,
	editCategories,
	deleteCategories,
};
