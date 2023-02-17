const mongoose = require("mongoose");

const adminSchema = require("../schemas/admin");
const brandSchema = require("../schemas/brand");
const categorySchema = require("../schemas/category");
const productSchema = require("../schemas/product");
const orderDetailSchema = require("../schemas/orderDetail");
const orderHistorySchema = require("../schemas/orderHistory");

const extraUserSchema = require("../schemas/extraUser");

// const userSchema = require("../schemas/user");

exports.Admin = mongoose.model("Admin", adminSchema);
exports.Brand = mongoose.model("Brand", brandSchema);
exports.Category = mongoose.model("Category", categorySchema);
exports.Product = mongoose.model("Product", productSchema);
exports.OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
exports.OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

exports.ExtraUser = mongoose.model("ExtraUser", extraUserSchema);

// exports.Product = mongoose.model("User", userSchema);
