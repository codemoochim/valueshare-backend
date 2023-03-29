import { model } from "mongoose";

import adminSchema from "../schemas/admin";
import brandSchema from "../schemas/brand";
import categorySchema from "../schemas/category";
import productSchema from "../schemas/product";
import orderSchema from "../schemas/order";
import userSchema from "../schemas/user";

export const Admin = model("Admin", adminSchema);
export const Brand = model("Brand", brandSchema);
export const Category = model("Category", categorySchema);
export const Product = model("Product", productSchema);
export const Order = model("Order", orderSchema);
export const User = model("User", userSchema);
