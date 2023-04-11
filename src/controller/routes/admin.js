const express = require("express");
const router = express.Router();
const imageUploadS3 = require("../../middleware/imageUploadS3");

const productCtrl = require("../productCtrl");
const categoryCtrl = require("../categoryCtrl");
const brandCtrl = require("../brandCtrl");
const orderCtrl = require("../orderCtrl");

const { Product } = require("../../db/model");

// 어드민 상품 관리
// admin/products
router.get("/test", async (req, res) => {
  // const products = await Product.find({}, { productImage: 1, _id: 0 });
  const products = await Product.find({}, { productImage: 1, _id: 1 });
  // [{productImage:[1,2,3]}, {productImage:[1,2,3]}, {productImage:[1,2,3]}...]

  for (const productImages of products) {
    // productImages {productImage:[1,2,3]}
    // productImages.productImage [1,2,3]
    const newImageURL = productImages.productImage.map((url) => {
      const newurl = url.replace(
        "https://valueshare3.s3.ap-northeast-2.amazonaws.com",
        "https://d3izko8fgs5ndf.cloudfront.net"
      );
      return newurl;
    });
    // console.log(newImageURL);
    productImages.productImage = newImageURL;
    await productImages.save();
    // console.log(productImages);
  }

  // 1개
  // [
  //   'https://valueshare3.s3.ap-northeast-2.amazonaws.com/images/06ec33a5-75ae-4e85-9808-7d58cac1552b_1212.png'
  // ]
  // 2개
  // [
  //   'https://valueshare3.s3.ap-northeast-2.amazonaws.com/images/32deec23-0417-4db8-bd74-eb3576bc5809_1212.png',
  //   'https://valueshare3.s3.ap-northeast-2.amazonaws.com/images/53b40afa-e309-4515-924c-a94060131352_1212.png'
  // ]
  // console.log(products);
  // res.send(products);
  res.send("확인");
});

router
  .route("/products")
  .get(productCtrl.getProductList)
  .post(imageUploadS3.array("productImage", 5), productCtrl.addProduct);
router
  .route("/products/:productId")
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
  .route("/orders/:orderId")
  .get(orderCtrl.getOrderDetail)
  .patch(orderCtrl.editOrderDetail)
  .post(orderCtrl.cancelOrderDetail);
module.exports = router;
