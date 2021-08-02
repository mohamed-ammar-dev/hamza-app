import { User } from "../models/users";
import { ObjectId } from "mongodb";
import AuthenticationService from "./authenticationService";

export default class UserService {
  static async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  static async findUserById(_id) {
    return await User.findOne({ _id: new ObjectId(_id) });
  }

  static async updatePassword(_id, newPassword) {
    const password = await AuthenticationService.hashPassword(newPassword);

    return await User.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { password } }
    );
  }
}
