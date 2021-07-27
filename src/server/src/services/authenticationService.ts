import { ROLE } from "../interfaces/Interfaces";
import { User } from "../models/users";
import UserService from "./userService";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import AppError from "../utils/appError";

export default class AuthenticationService {
  static async validateDuplicateEmail(email) {
    const user = await UserService.findUserByEmail(email);

    if (user) throw new AppError("Email already exist.", 400);
  }

  static async createUser(user) {
    user.password = await hash(user.password, 10);

    await User.insertOne({ ...user, role: ROLE.USER });
  }

  static async findByCredentials(email, password) {
    const user = await UserService.findUserByEmail(email);
    if (!user) throw new AppError("There was a problem with your login.", 400);

    const isPassword = await compare(password, user.password);
    if (!isPassword)
      throw new AppError("There was a problem with your login.", 400);

    return user;
  }

  static async generateAuthToken(_id) {
    return sign({ _id }, process.env.JWT_PRIVATE_KEY);
  }
}
