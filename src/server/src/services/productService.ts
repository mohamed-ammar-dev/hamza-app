import { Product } from "../models/products";
import { getDate, getNow } from "../utils/date";
import { product, ROLE } from "../interfaces/Interfaces";
import { ObjectId } from "mongodb";
import ProductServiceAdmin from "./productService.admin";

export default class ProductService {
  static async getAllProducts() {
    return await Product.find();
  }

  static async getProductByVoucherCode(voucherCode: string) {
    return await Product.findOne({
      voucherCode,
    });
  }

  static async getTodayProducts(role: string, user_id: string) {
    const [start, end] = getDate();

    if (role == ROLE.ADMIN)
      return await ProductServiceAdmin.getTodayProducts(start, end);

    return await Product.aggregate([
      {
        $match: {
          date: {
            $gte: start,
            $lt: end,
          },
          user_id: new ObjectId(user_id),
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$productPrice" },
          items: { $sum: 1 },
        },
      },
    ]).toArray();
  }

  static async getAllPendingProducts() {
    return await Product.find({ isDownloaded: false }).toArray();
  }

  static async getPendingProducts() {
    const products = await Product.aggregate([
      {
        $match: { isDownloaded: false },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$productPrice" },
          items: { $sum: 1 },
        },
      },
    ]).toArray();

    if (products.length == 0) products.push(this.setIntialCounter());
    return products[0];
  }

  static async getMoreInformationProducts() {
    return await Product.aggregate([
      {
        $match: { isDownloaded: false },
      },
      {
        $group: {
          _id: {
            user: "$user_id",
            product: "$productName",
          },
          totalPrice: { $sum: "$productPrice" },
          items: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          username: "$user.username",
          totalPrice: 1,
          items: 1,
          product: "$_id.product",
          _id: 0,
        },
      },
      { $sort: { username: 1 } },
    ]).toArray();
  }

  static async updateProducts() {
    await Product.updateMany(
      { isDownloaded: false },
      { $set: { isDownloaded: true } }
    );
  }

  static async saveProduct(
    data: product,
    accountNumber: string,
    user_id: ObjectId
  ) {
    return await Product.insertOne({
      user_id: new ObjectId(user_id),
      productName: data.productName,
      voucherCode: data.voucherCode,
      productPrice: +data.productPrice,
      accountNumber,
      date: getNow(),
      isDownloaded: false,
    });
  }

  static setIntialCounter(items = 0) {
    return { items, totalPrice: 0 };
  }
}
