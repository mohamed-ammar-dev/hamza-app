import { User } from "../models/users";
import { ObjectId } from "mongodb";

export default class UserService {
  static async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  static async findUserById(_id) {
    return await User.findOne({ _id: new ObjectId(_id) });
  }
}
