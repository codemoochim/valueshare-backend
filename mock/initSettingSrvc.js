const bag = require("./bag");
const bottom = require("./bottom");
const bottom2 = require("./bottom2");
const dress = require("./dress");
const outer = require("./outer");
const top = require("./top");
const twoPiece = require("./twoPiece");

const { Brand, Product, Category } = require("../src/db/model/index");
const bagSource = {
	194499: {
		goods_name: "30 MONTAIGNE REVERSIBLE BELT",
		brand_name: "Dior",
		brand_num: 0,
		imgs: [
			"https://media.dior.com/couture/ecommerce/media/catalog/product/0/X/1674848715_B0179UWGA_M118_E10_GH.jpg?imwidth=430",
			"https://media.dior.com/couture/ecommerce/media/catalog/product/0/X/1674848715_B0179UWGA_M118_E01_ZHC.jpg?imwidth=870",
			"https://media.dior.com/couture/ecommerce/media/catalog/product/0/X/1674848715_B0179UWGA_M118_E03_GH.jpg?imwidth=430",
			"https://media.dior.com/couture/ecommerce/media/catalog/product/0/X/1674848715_B0179UWGA_M118_E07_GH.jpg?imwidth=430",
		],
		type_str: "\uc758\ub958",
		category_name: "\ud22c\ud53c\uc2a4",
		sub_category_name: "\ud22c\ud53c\uc2a4",
		hashtags: ["\uc77c\uc0c1", "\uc704\ucf04\ub4dc"],
		color: "Black",
		material: "\uba74",
	},
};

// 데이터 주입시킴
const setSrvc = async () => {
	try {
		// 스키마 추가, 수정, 삭제 실패. populate 되있어서?
		// const result = await Category.find({});
		// delete result.shortId;
		const result = await Category.findOneAndUpdate(
			{ _id: "63f254944a730cb5c34c89f0" },
			{ $unset: { shortId: 1 } },
			{ new: true },
		);
		result.forEach((i) => console.log(typeof i.shortId));
		console.log(result.shortId);
		result.save();
		// mocㅏ json 파일 분류
		const putBag = (type) => {
			const result = Object.values(type).map((i) => {
				return {
					productBrand: i.brand_name,
					productCategory: "accessories",
					productTitle: i.goods_name,
					productImage: i.imgs,
					productDescription:
						"Inspired by the hallmark namesake bag, the 30 Montaigne belt is offered in a reversible variation, thanks to its swivel feature. Crafted in latte smooth calfskin on one side and beige on the other, it is embellished with the iconic shiny gold-finish metal CD buckle. The design also features two removable loops that can be worn in an either tonal or contrasting fashion. The timeless accessory elegantly highlights the waist and will coordinate well with jeans, a skirt or a dress.",
					productDetail: `
					30 Montaigne CD buckle
					Shiny gold-finish metal detailing
					Two removable loops
					100% calfskin
					Made in Italy
					Width: 35 mm / 1.5 inches
					For more information, please view the size guide`,
				};
			});
			return result;
		};
		const arrBag = putBag();
		console.log(arrBag);
		arrBag.forEach(async (i) => {
			const setBrand = await Brand.findOne({
				brandName: i.productBrand,
			});
			const setCate = await Category.findOne({
				categoryName: i.productCategory,
			});
			const sett = await Product.create({
				productBrand: setBrand._id,
				productCategory: setCate._id,
				productTitle: i.productTitle,
				productImage: i.productImage,
				productDescription: i.productDescription,
				productDetail: i.productDetail,
			});
			const setinit = await Product.findById(sett._id)
				.populate("productBrand")
				.populate("productCategory");
			return setinit;
		});
	} catch (err) {
		console.error(err);
	}
};
// bag 1004개, bottom 1006, dress 1006, outer 1005
// twoPiece 1001개

// 1000개 씩 업로드 이미지 1개뿐

module.exports = { setSrvc };
