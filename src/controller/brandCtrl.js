const brandSrvc = require("../services/brandSrvc");

const getBrand = async (req, res, next) => {
	try {
		const brandList = await brandSrvc.findBrandList();
		res.json({ result: brandList });
	} catch (err) {
		next(err);
	}
};

const addBrand = async (req, res, next) => {
	try {
		const brandNewData = req.body;
		const newBrand = await brandSrvc.createBrand(brandNewData);
		res.json({ result: newBrand });
	} catch (err) {
		next(err);
	}
};

const editBrand = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		const brandNewData = req.body;
		const editedBrand = await brandSrvc.updateBrand(shortId, brandNewData);
		res.json({ result: editedBrand });
	} catch (err) {
		next(err);
	}
};
const removeBrand = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		await brandSrvc.deleteBrand(shortId);
		res.json({ message: "브랜드 삭제가 완료되었습니다." });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getBrand,
	addBrand,
	editBrand,
	removeBrand,
};
