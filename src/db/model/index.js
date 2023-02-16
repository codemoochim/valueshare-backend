const mongoose = require("mongoose");

const adminSchema = require("../schemas/admin");
const brandSchema = require("../schemas/brand");
const categorySchema = require("../schemas/category");
const productSchema = require("../schemas/product");
const orderProductSchema = require("../schemas/orderProduct");
const extraUserSchema = require("../schemas/extraUser");
const orderSchema = require("../schemas/order");
const imageSchema = require("../schemas/image");
// const userSchema = require("../schemas/user");

exports.Admin = mongoose.model("Admin", adminSchema);
exports.Brand = mongoose.model("Brand", brandSchema);
exports.Category = mongoose.model("Category", categorySchema);
exports.Product = mongoose.model("Product", productSchema);
exports.OrderProduct = mongoose.model("OrderProduct", orderProductSchema);
exports.ExtraUser = mongoose.model("ExtraUser", extraUserSchema);
exports.Order = mongoose.model("Order", orderSchema);
exports.Image = mongoose.model("Image", imageSchema);
// exports.Product = mongoose.model("User", userSchema);
