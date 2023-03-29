import {
	findBrandList,
	createBrand,
	updateBrand,
	deleteBrand,
} from "../services/brandSrvc";

// 브랜드 목록 조회
const getBrandList = async (req, res, next) => {
	try {
		const brandList = await findBrandList();
		res.json({ result: brandList });
	} catch (err) {
		next(err);
	}
};

// 브랜드 추가
const addBrand = async (req, res, next) => {
	try {
		const brandNewData = req.body;
		const newBrand = await createBrand(brandNewData);
		res.json({ result: newBrand });
	} catch (err) {
		next(err);
	}
};

// 브랜드 수정
const editBrand = async (req, res, next) => {
	try {
		const { brandName } = req.params;
		const brandNewData = req.body;
		const editedBrand = await updateBrand(brandName, brandNewData);
		res.json({ result: editedBrand });
	} catch (err) {
		next(err);
	}
};

// 브랜드 삭제
const removeBrand = async (req, res, next) => {
	try {
		const { brandName } = req.params;
		await deleteBrand(brandName);
		res.json({ message: "브랜드 삭제가 완료되었습니다." });
	} catch (err) {
		next(err);
	}
};

export default {
	getBrandList,
	addBrand,
	editBrand,
	removeBrand,
};
