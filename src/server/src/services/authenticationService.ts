import { ROLE } from "../interfaces/Interfaces";
import { User } from "../models/users";
import UserService from "./userService";
import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import AppError from "../utils/appError";

export default class AuthenticationService {
  static async validateDuplicateEmail(email) {
    const user = await UserService.findUserByEmail(email);

    if (user) throw new AppError("Email already exist.", 400);
  }

  static async createUser(user) {
    user.password = await this.hashPassword(user.password);

    await User.insertOne({ ...user, role: ROLE.USER });
  }

  static async hashPassword(password) {
    return await hash(password, 10);
  }

  static async findByCredentials(email, password) {
    const user = await UserService.findUserByEmail(email);
    if (!user) throw new AppError("There was a problem with your login.", 400);

    const isPassword = await compare(password, user.password);
    if (!isPassword)
      throw new AppError("There was a problem with your login.", 400);

    return user;
  }

  static async generateAuthToken(_id, expiresIn) {
    return sign({ _id }, process.env.JWT_PRIVATE_KEY, { expiresIn });
  }

  static async verifyToken(token) {
    if (!token) throw new AppError("Invalid token. Please log in again!", 401);

    return verify(token, process.env.JWT_PRIVATE_KEY);
  }
}
