import { Product } from "../models/products";

export default class ProductServiceAdmin {
  static async getTodayProducts(start: Date, end: Date) {
    return await Product.aggregate([
      {
        $match: {
          date: {
            $gte: start,
            $lt: end,
          },
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
}
