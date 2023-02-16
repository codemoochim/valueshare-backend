const brandServices = require("../services/brandServices");

const getBrand = async (req, res, next) => {
	try {
		const brandlists = await brandServices.getBrandLists();
		res.json({ data: brandlists });
	} catch (err) {
		next(err);
	}
};

const addBrand = async (req, res, next) => {
	try {
		const brandData = req.body;
		console.log(brandData);
		const newBrand = await brandServices.brandAdd(brandData);

		res.json({ data: newBrand });
	} catch (err) {
		next(err);
	}
};

const editBrand = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		const brandNewData = req.body;
		const editedProduct = await brandServices.brandInfoEdit(
			shortId,
			brandNewData,
		);
		res.json({ data: editedProduct });
	} catch (err) {
		next(err);
	}
};
const deleteBrand = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		await brandServices.brandInfoDelete(shortId);
		res.json({ message: "delete completed" });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getBrand,
	addBrand,
	editBrand,
	deleteBrand,
};
