const express = require("express");
const router = express.Router();
const imageUploadS3 = require("../../middleware/imageUploadS3");
const productsController = require("../../controller/productsController");
const categoryController = require("../../controller/categoryController");
const brandController = require("../../controller/brandController");

// /admin
// 관리자 페이지

// 상품 정보 등록
router.post("/product", productsController.addProductInfo);

// 상품 이미지 낱개 업로드
router.post(
	"/product/images",
	imageUploadS3.single("file"),
	productsController.imageUpload,
);

// 상품 정보 수정
router
	.route("/product/:shortId")
	.post(productsController.editProductInfo)
	.delete(productsController.DeleteproductInfo);

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

router.get("/productLists");
router.get("/productLists/:shortId");
module.exports = router;
