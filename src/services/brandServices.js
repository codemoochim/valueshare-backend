const { Image, Product, Brand } = require("../db/model/index");

const getBrandLists = async () => {
	try {
		const brandlists = await Brand.find({});
		return brandlists;
	} catch (err) {
		throw new Error(err);
	}
};

const brandAdd = async (brandData) => {
	try {
		const { name } = brandData;
		if (!name) {
			throw new Error("필수 입력 정보를 확인하세요");
		}
		const isExist = await Brand.findOne({ name });
		if (isExist) {
			throw new Error("동일한 카테고리가 이미 존재합니다.");
		}
		const newBrand = await Brand.create({
			name,
		});
		return newBrand;
	} catch (err) {
		throw new Error(err);
	}
};

const brandInfoEdit = async (shortId, brandNewData) => {
	try {
		const { name } = brandNewData;
		const result = await Brand.findOneAndUpdate(
			{ shortId },
			{ name },
			{ new: true },
		);
		if (!result) {
			throw new Error("상품 정보 업데이트에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};

const brandInfoDelete = async (shortId) => {
	try {
		const result = await Brand.findOneAndDelete({ shortId });
		if (!result) {
			throw new Error("상품 삭제에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	getBrandLists,
	brandAdd,
	brandInfoEdit,
	brandInfoDelete,
};
