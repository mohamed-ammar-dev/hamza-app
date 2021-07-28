import { ObjectId } from "mongodb";
import { Account } from "../models/accounts";
import { getNow } from "../utils/date";

export default class ProductService {
  static async getAccountByNumber(accountNumber: string) {
    return await Account.find({
      accountNumber,
    }).toArray();
  }

  static async getAccountByQuery(query: object) {
    return await Account.find(query).sort({ date: -1 }).toArray();
  }

  static async getAccountByDate(start: Date, end: Date) {
    return await Account.find({
      date: {
        $gte: start,
        $lt: end,
      },
    }).toArray();
  }

  static async saveAccount(
    accountNumber: string,
    price: number,
    username: string
  ) {
    return await Account.insertOne({
      username,
      accountNumber,
      price,
      date: getNow(),
    });
  }

  static async updateAccount(
    accountNumber: string,
    price: number,
    username: string
  ) {
    await Account.updateOne(
      { accountNumber },
      { $set: { date: getNow(), price, username } }
    );
  }

  static async deleteAccount(_id: string) {
    await Account.deleteOne({ _id: new ObjectId(_id) });
  }
}
