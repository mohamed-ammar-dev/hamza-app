import { Account } from "../models/accounts";
import { getNow } from "../utils/date";

export default class ProductService {
  static async getAccountByNumber(accountNumber: string) {
    return await Account.find({
      accountNumber,
    }).toArray();
  }

  static async getAccountByQuery(query: object) {
    const test = await Account.find(query).sort({ date: -1 }).toArray();
    console.log(test);
    return test;
  }

  static async getAccountByDate(start: Date, end: Date) {
    return await Account.find({
      date: {
        $gte: start,
        $lt: end,
      },
    }).toArray();
  }

  static async saveAccount(accountNumber: string, price: number) {
    return await Account.insertOne({
      accountNumber,
      price,
      date: getNow(),
    });
  }

  static async updateAccount(accountNumber: string, price: number) {
    await Account.updateOne({ accountNumber }, { date: getNow(), price });
  }

  static async deleteAccount(_id: string) {
    await Account.findByIdAndDelete(_id);
  }
}
