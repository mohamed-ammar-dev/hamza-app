import { Request, Response } from "express";
import { forgotPassword } from "../emails/emails";
import AuthenticationService from "../services/authenticationService";
import {
  clearAllTokens,
  getResetPasswordToken,
  saveResetPasswordToken,
} from "../services/cache";
import UserService from "../services/userService";
import AppError from "../utils/appError";
import { Joi } from "../utils/joi";

export default class Password {
  static async generateToken(request: Request, response: Response) {
    const { email } = request.params;

    if (!email) throw new AppError("Email required.", 400);

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
    const { password } = request.body;
    const { token } = request.params;

    const joi = Joi.getInstance();
    await joi.resetPasswordSchema.validateAsync(password);

    if (!password || !token) throw new AppError("Invalid request.", 400);

    const decode = await AuthenticationService.verifyToken(token);

    const cachedToken = await getResetPasswordToken(decode._id);

    if (cachedToken != token) throw new AppError("Invalid token.", 400);

    UserService.updatePassword(decode._id, password);

    clearAllTokens(decode._id);

    response.send();
  }
}
