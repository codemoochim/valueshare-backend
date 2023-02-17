const express = require("express");
const router = express.Router();
const imageUploadS3 = require("../../middleware/imageUploadS3");
const productsController = require("../../controller/productsController");
const categoryController = require("../../controller/categoryController");
const brandController = require("../../controller/brandController");
const orderManageController = require("../../controller/orderManageController");

// /admin
// 관리자 페이지

// 상품 정보 등록
router.post("/product", productsController.addProductInfo);

// 상품 이미지 낱개 업로드
// router.post(
// 	"/product/images", // 1차 업로드 하는 경로와 2차 업로드 하는 경로가 같을 수 있나?
// 	imageUploadS3.single("file"),
// 	productsController.imageUpload,
// );

// 상품 이미지 다중 업로드
router.post(
	"/product/images",
	imageUploadS3.array("imageFile"),
	// }, // 여러개 이미지를 할 수 있도록 설정해 놓았는데, 1개만 하거나 아예 안하는 경우에는 어떻게되나?
	productsController.imageUpload,
);
// router.post(
// 	"/product/images",
// 	(req, res, next) => {
// 		console.log(req.body);
// next();
// 	},
// 	imageUploadS3.array("imageFile"),
// 	// }, // 여러개 이미지를 할 수 있도록 설정해 놓았는데, 1개만 하거나 아예 안하는 경우에는 어떻게되나?
// 	productsController.imageUpload,
// );

// 상품 정보 수정
router
	.route("/product/:shortId")
	.post(productsController.editProductInfo)
	.delete(productsController.deleteproductInfo);

// 카테고리 관리
router
	.route("/categories")
	.get(categoryController.getCategories)
	.post(categoryController.addCategories);
router
	.route("/categories/:shortId")
	.post(categoryController.editCategories)
	.delete(categoryController.deleteCategories);

// 브랜드 관리
router
	.route("/brand")
	.get(brandController.getBrand)
	.post(brandController.addBrand);
router
	.route("/brand/:shortId")
	.post(brandController.editBrand)
	.delete(brandController.deleteBrand);

router.get("/orders", orderManageController.getOrderLists);
router
	.route("/orders/:shortId")
	.get(orderManageController.getOrderDetails)
	.post(orderManageController.editOrderDetails);
// .delete(orderManageController.deleteOrderDetails);
module.exports = router;
