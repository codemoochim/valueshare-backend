const express = require("express");
const router = express.Router();
const imageUploadS3 = require("../../middleware/imageUploadS3");

const productCtrl = require("../productCtrl");
const categoryCtrl = require("../categoryCtrl");
const brandCtrl = require("../brandCtrl");
const orderCtrl = require("../orderCtrl");
// const initSetting = require("../../../mock/initSettingCtrl");

// /admin
// 어드민 페이지

// router.patch("/add", initSetting.setCtrl);

// 어드민 상품 관리
// admin/products
router
	.route("/products")
	.get(productCtrl.getProductList)
	.post(imageUploadS3.array("productImage", 5), productCtrl.addProduct);
router
	.route("/products/:_id")
	.get(productCtrl.getProduct)
	.patch(imageUploadS3.array("productImage", 5), productCtrl.editProduct)
	.delete(productCtrl.removeProduct);

// 어드민 카테고리 관리
// admin/categories
router
	.route("/categories")
	.get(categoryCtrl.getCategoryList)
	.post(categoryCtrl.addCategory);
router
	.route("/categories/:categoryName")
	.patch(categoryCtrl.editCategory)
	.delete(categoryCtrl.removeCategory);

// 어드민 브랜드 관리
// admin/brands
router.route("/brands").get(brandCtrl.getBrandList).post(brandCtrl.addBrand);
router
	.route("/brands/:brandName")
	.patch(brandCtrl.editBrand)
	.delete(brandCtrl.removeBrand);

// 어드민 주문 관리
// /orders
router.get("/orders", orderCtrl.getOrderList);
router
	.route("/orders/:_id")
	.get(orderCtrl.getOrderDetail)
	.patch(orderCtrl.editOrderDetail)
	.post(orderCtrl.cancelOrderDetail);

module.exports = router;
