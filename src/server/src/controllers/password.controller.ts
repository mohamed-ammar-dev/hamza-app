import { Request, Response } from "express";
import { forgotPassword } from "../emails/emails";
import AuthenticationService from "../services/authenticationService";
import {
  getResetPasswordToken,
  saveResetPasswordToken,
} from "../services/cache";
import UserService from "../services/userService";
import AppError from "../utils/appError";

export default class Password {
  static async generateToken(request: Request, response: Response) {
    //check email
    const email = request.params.email;

    const user = await UserService.findUserByEmail(email);

    if (!user) return response.send();

    user._id = user._id.toString();

    const token = await AuthenticationService.generateAuthToken(
      user._id,
      60 * 60 * 1000
    );

    saveResetPasswordToken(user._id, token);
    forgotPassword(user.email, request.headers.host, token);

    response.send();
  }
  static async resetPassword(request: Request, response: Response) {
    //check password and token
    const { password } = request.body;
    const token = request.params.token;

    const decode = await AuthenticationService.verifyToken(token);

    const cachedToken = await getResetPasswordToken(decode._id);

    if (cachedToken != token) throw new AppError("Invalid token.", 400);

    UserService.updatePassword(decode._id, password);

    response.send();
  }
  static async renderForgotPassword(_: Request, response: Response) {
    response.render("forgotPassword.hbs");
  }
}
