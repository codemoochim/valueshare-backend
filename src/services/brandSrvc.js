const { Brand } = require("../db/model/index");

// 브랜드 목록 조회
const findBrandList = async () => {
	try {
		const brandList = await Brand.find({});
		return brandList;
	} catch (err) {
		throw new Error(err);
	}
};

// 브랜드 생성추가
const createBrand = async (brandNewData) => {
	try {
		const { brandName } = brandNewData;
		if (!brandName) {
			throw new Error("필수 입력 정보를 확인하세요");
		}
		const isExist = await Brand.findOne({ brandName });
		if (isExist) {
			throw new Error("동일한 브랜드가 이미 존재합니다.");
		}
		const newBrand = await Brand.create({
			brandName,
		});
		return newBrand;
	} catch (err) {
		throw new Error(err);
	}
};

// 브랜드 수정
const updateBrand = async (brandName, brandNewData) => {
	try {
		const isExist = await Brand.findOne({
			brandName: brandName,
		});
		if (isExist.brandName === brandNewData.brandName) {
			throw new Error("동일한 브랜드가 이미 존재합니다.");
		}
		isExist.brandName = brandNewData.brandName;
		await isExist.save();
		return isExist;
	} catch (err) {
		throw new Error(err);
	}
};

// 브랜드 삭제
const deleteBrand = async (brandName) => {
	try {
		const result = await Brand.findOneAndDelete({ brandName });
		if (!result) {
			throw new Error("브랜드 삭제에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	findBrandList,
	createBrand,
	updateBrand,
	deleteBrand,
};
