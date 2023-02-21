const express = require("express");
const router = express.Router();
const imageUploadS3 = require("../../middleware/imageUploadS3");

const productCtrl = require("../productCtrl");
const categoryCtrl = require("../categoryCtrl");
const brandCtrl = require("../brandCtrl");
const orderManageCtrl = require("../orderManageCtrl");

// /admin
// 관리자 페이지

// 상품 관리
// admin/products
router
	.route("/products")
	.get(productCtrl.getProductList)
	.post(imageUploadS3.array("imageFile"), productCtrl.addProduct);
router
	.route("/products/:shortId")
	.get(productCtrl.getProduct)
	.post(productCtrl.editProduct)
	.delete(productCtrl.removeProduct);

// 카테고리 관리
// /admin/categories
router
	.route("/categories")
	.get(categoryCtrl.getCategoryList)
	.post(categoryCtrl.addCategory);
router
	.route("/categories/:shortId")
	.post(categoryCtrl.editCategory)
	.delete(categoryCtrl.removeCategory);

// 브랜드 관리
// /brands
router.route("/brands").get(brandCtrl.getBrand).post(brandCtrl.addBrand);
router
	.route("/brands/:shortId")
	.post(brandCtrl.editBrand)
	.delete(brandCtrl.removeBrand);

// 주문 관리
// /orders
router.get("/orders", orderManageCtrl.getOrderList);
router
	.route("/orders/:shortId")
	.get(orderManageCtrl.getOrderDetail)
	.post(orderManageCtrl.editOrderDetail)
	.delete(orderManageCtrl.removeOrderDetail);
module.exports = router;
