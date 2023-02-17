const productsServices = require("../services/productsServices");

// 상품이미지 낱개 업로드
// const imageUpload = async (req, res, next) => {
// 	try {
// 		const location = req.file.location;
// 		const savedImage = await productsServices.imageUploadMongo(location);
// 		res.json({ data: savedImage.image }); // image url
// 	} catch (err) {
// 		next(err);
// 	}
// };
const imageUpload = async (req, res, next) => {
	try {
		console.log("imageUpload 시작");
		const location = req.files;
		const body = req.body;
		// console.log(location);
		// console.log(23);
		// console.log(body);
		const addedProduct = await productsServices.imageUploadMongo(
			location,
			body,
		);
		// console.log(addedProduct);
		res.json({ addedProduct });
	} catch (err) {
		next(err);
	}
};

const addProductInfo = async (req, res, next) => {
	try {
		const productData = req.body;
		const newProduct = await productsServices.productInfoUpload(productData);
		res.json({ data: newProduct });
	} catch (err) {
		next(err);
	}
};

const editProductInfo = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		const productNewData = req.body;
		const editedProduct = await productsServices.productInfoEdit(
			shortId,
			productNewData,
		);
		res.json({ data: editedProduct });
	} catch (err) {
		next(err);
	}
};
const deleteproductInfo = async (req, res, next) => {
	try {
		const { shortId } = req.params;
		await productsServices.productInfoDelete(shortId);
		res.json({ message: "delete completed" });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	imageUpload,
	addProductInfo,
	editProductInfo,
	deleteproductInfo,
};
