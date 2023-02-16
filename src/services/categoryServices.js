const { Image, Product, Category } = require("../db/model/index");

const getCategoryLists = async () => {
	try {
		const categorylists = await Category.find({});
		return categorylists;
	} catch (err) {
		throw new Error(err);
	}
};

const categoryAdd = async (categoryData) => {
	try {
		const { name } = categoryData;
		if (!name) {
			throw new Error("필수 입력 정보를 확인하세요");
		}
		const isExist = await Category.findOne({ name });
		if (isExist) {
			throw new Error("동일한 카테고리가 이미 존재합니다.");
		}
		const newCategory = await Category.create({
			name,
		});
		return newCategory;
	} catch (err) {
		throw new Error(err);
	}
};

const categoryInfoEdit = async (shortId, categoryNewData) => {
	try {
		const { name } = categoryNewData;
		const result = await Category.findOneAndUpdate(
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

const categoryInfoDelete = async (shortId) => {
	try {
		const result = await Category.findOneAndDelete({ shortId });
		if (!result) {
			throw new Error("상품 삭제에 오류가 있습니다.");
		}
		return result;
	} catch (err) {
		throw new Error(err);
	}
};
module.exports = {
	getCategoryLists,
	categoryAdd,
	categoryInfoEdit,
	categoryInfoDelete,
};
