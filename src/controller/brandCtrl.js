const brandSrvc = require("../services/brandSrvc");

const getBrandList = async (req, res, next) => {
	try {
		const brandList = await brandSrvc.findBrandList();
		res.json({ result: brandList });
	} catch (err) {
		next(err);
	}
};

const getProductByBrand = async (req, res, next) => {
	try {
		const { brand } = req.query;
		const brandList = await brandSrvc.findProductByBrand(brand);
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
		const { _id } = req.params;
		const brandNewData = req.body;
		const editedBrand = await brandSrvc.updateBrand(_id, brandNewData);
		res.json({ result: editedBrand });
	} catch (err) {
		next(err);
	}
};
const removeBrand = async (req, res, next) => {
	try {
		const { _id } = req.params;
		await brandSrvc.deleteBrand(_id);
		res.json({ message: "브랜드 삭제가 완료되었습니다." });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getBrandList,
	getProductByBrand,
	addBrand,
	editBrand,
	removeBrand,
};
