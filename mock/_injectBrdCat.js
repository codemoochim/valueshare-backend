const bag = require("./mock/bag");
const bottom = require("./mock/bottom");
const bottom2 = require("./mock/bottom2");
const dress = require("./mock/dress");
const outer = require("./mock/outer");
const top = require("./mock/top");
const twoPiece = require("./mock/twoPiece");

const { Brand, Product, Category } = require("../src/db/model/index");

// 브랜드, 카테고리 모델 다큐먼트 주입
const setSrvc = async () => {
	try {
		const uniq = (array) => [...new Set(array)];
		const findBrand = (type) => {
			const result = Object.values(type).map((i) => {
				return i.brand_name;
			});
			return result;
		};
		// 브랜드만 추출
		const bagBrand = findBrand(bag);
		const bottomBrand = findBrand(bottom);
		const bottomBrand2 = findBrand(bottom2);
		const dressBrand = findBrand(dress);
		const outerBrand = findBrand(outer);
		const topBrand = findBrand(top);
		const twoPieceBrand = findBrand(twoPiece);
		// 중복 삭제
		const bagresult = uniq(bagBrand);
		const bottomresult = uniq(bottomBrand);
		const bottom2result = uniq(bottomBrand2);
		const dressresult = uniq(dressBrand);
		const outerresult = uniq(outerBrand);
		const topresult = uniq(topBrand);
		const twoPieceresult = uniq(twoPieceBrand);
		// 배열 합친 후 중복 삭제
		const one = bagresult.concat(bottomresult);
		const two = bottom2result.concat(dressresult);
		const three = outerresult.concat(topresult);
		const four = one.concat(twoPieceresult);
		const five = two.concat(three);
		const six = four.concat(five);
		const result2 = uniq(six);
		result2.forEach(async (i) => {
			await Brand.create({ brandName: i });
		});
		return "브랜드 초기세팅 완료";
	} catch (err) {
		throw new Error(err);
	}
};

// const arr = [
// 	"Bag",
// 	"Bottom",
// 	"Top",
// 	"Dress",
// 	"Outer",
// 	"Two Piece",
// 	"Accessory",
// ];
// arr.forEach(async (i) => {
// 	await Category.create({
// 		categoryName: i,
// 	});
// });

// module.exports = { setSrvc };
