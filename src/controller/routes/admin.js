const express = require("express");
const router = express.Router();
const imageUploadS3 = require("../../middleware/imageUploadS3");

const productCtrl = require("../productCtrl");
const categoryCtrl = require("../categoryCtrl");
const brandCtrl = require("../brandCtrl");
const orderManageCtrl = require("../orderManageCtrl");
// 초기 세팅. 데이터 주입
// const initSettingCtrl = require("../initSettingCtrl");

// /admin
// 관리자 페이지

// 상품 관리
// admin/products
router.route("/products").get(productCtrl.getProductList).post(
	// productCtrl.checkProduct, 요청값 검증이 이미지 업로드 사전에 이뤄져야함
	imageUploadS3.array("productImage", 5),
	productCtrl.addProduct,
);
router
	.route("/products/:shortId")
	.get(productCtrl.getProduct)
	.patch(productCtrl.editProduct)
	.delete(productCtrl.removeProduct);

// 카테고리 관리
// /admin/categories
router
	.route("/categories")
	.get(categoryCtrl.getCategoryList)
	.post(categoryCtrl.addCategory);
router
	.route("/categories/:shortId")
	.patch(categoryCtrl.editCategory)
	.delete(categoryCtrl.removeCategory);

// 브랜드 관리
// /brands
router.route("/brands").get(brandCtrl.getBrand).post(brandCtrl.addBrand);
router
	.route("/brands/:shortId")
	.patch(brandCtrl.editBrand)
	.delete(brandCtrl.removeBrand);

// 주문 관리
// /orders
router.get("/orders", orderManageCtrl.getOrderList);
router
	.route("/orders/:shortId")
	.get(orderManageCtrl.getOrderDetail)
	.patch(orderManageCtrl.editOrderDetail)
	.post(orderManageCtrl.removeOrderDetail);

// 초기 세팅 데이터 주입
// router.route("/setting").get(initSettingCtrl.setCtrl);
module.exports = router;
