const express = require("express");
const router = express.Router();
const imageUploadS3 = require("../../middleware/imageUploadS3");

const productCtrl = require("../productCtrl");
const categoryCtrl = require("../categoryCtrl");
const brandCtrl = require("../brandCtrl");
const orderCtrl = require("../orderCtrl");
// /admin
// 관리자 페이지

// 상품 관리
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

// 카테고리 관리
// admin/categories
router
	.route("/categories")
	.get(categoryCtrl.getCategoryList)
	.post(categoryCtrl.addCategory);
router
	.route("/categories/:_id")
	.patch(categoryCtrl.editCategory)
	.delete(categoryCtrl.removeCategory);

// 브랜드 관리
// /brands
router.route("/brands").get(brandCtrl.getBrandList).post(brandCtrl.addBrand);
router
	.route("/brands/:_id")
	.patch(brandCtrl.editBrand)
	.delete(brandCtrl.removeBrand);

// 주문 관리
// /orders
router.get("/orders", orderCtrl.getOrderList);
router
	.route("/orders/:_id")
	.get(orderCtrl.getOrderDetail)
	.patch(orderCtrl.editOrderDetail)
	.post(orderCtrl.cancelOrderDetail);

module.exports = router;
