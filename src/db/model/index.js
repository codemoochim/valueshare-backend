const mongoose = require("mongoose");

const adminSchema = require("../schemas/admin");
const brandSchema = require("../schemas/brand");
const categorySchema = require("../schemas/category");
const productSchema = require("../schemas/product");
const orderSchema = require("../schemas/order");
const userSchema = require("../schemas/user");

exports.Admin = mongoose.model("Admin", adminSchema);
exports.Brand = mongoose.model("Brand", brandSchema);
exports.Category = mongoose.model("Category", categorySchema);
exports.Product = mongoose.model("Product", productSchema);
exports.Order = mongoose.model("Order", orderSchema);
exports.User = mongoose.model("User", userSchema);
