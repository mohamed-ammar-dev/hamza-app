import AuthService from "../services/authenticationService";
import { clearToken, saveAuthToken } from "../services/cache";
import AppError from "../utils/appError";
import { Joi } from "../utils/joi";

export default class Authntication {
  static async signUp(request, response) {
    const user = request.body;

    const joi = Joi.getInstance();
    const { error } = joi.signUpSchema.validate(user);

    if (error) throw new AppError(error.details[0].message, 400);

    await AuthService.validateDuplicateEmail(user.email);

    await AuthService.createUser(user);

    response.send({ message: "sign up successfully." });
  }

  static async login(request, response) {
    const data = request.body;

    const joi = Joi.getInstance();
    const { error } = joi.loginSchema.validate(data);

    if (error) throw new AppError(error.details[0].message, 400);

    const user = await AuthService.findByCredentials(data.email, data.password);

    user._id = user._id.toString();

    const token = await AuthService.generateAuthToken(
      user._id,
      60 * 60 * 1000 * 24 * 2
    );

    saveAuthToken(user, token);

    response.cookie("token", token, {
      signed: true,
      maxAge: 86400000 * 2,
      httpOnly: true,
    });
    response.cookie("user", user.username, { maxAge: 86400000 * 2 });
    response.cookie("role", user.role, { maxAge: 86400000 * 2 });

    response.send({ token });
  }

  static async logout(request, response) {
    clearToken(request.user._id, request.token);

    response.clearCookie("user");
    response.clearCookie("role");
    response.clearCookie("token");

    response.send({ message: "logout successfully." });
  }
}
