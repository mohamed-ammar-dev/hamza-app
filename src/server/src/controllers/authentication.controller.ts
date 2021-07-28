import UserService from "../services/authenticationService";
import { saveToken } from "../services/cache";
import AppError from "../utils/appError";
import { Joi } from "../utils/joi";

export default class Authntication {
  static async signUp(request, response) {
    const user = request.body;

    const joi = Joi.getInstance();
    const { error } = joi.signUpSchema.validate(user);

    if (error) throw new AppError(error.details[0].message, 400);

    await UserService.validateDuplicateEmail(user.email);

    await UserService.createUser(user);

    response.send({ message: "sign up successfully" });
  }

  static async login(request, response) {
    const data = request.body;

    const joi = Joi.getInstance();
    const { error } = joi.loginSchema.validate(data);

    if (error) throw new AppError(error.details[0].message, 400);

    const user = await UserService.findByCredentials(data.email, data.password);

    user._id = user._id.toString();

    const token = await UserService.generateAuthToken(user._id);

    saveToken(user, token);

    response.cookie("token", token, {
      signed: true,
      maxAge: 86400000 * 2,
      httpOnly: true,
    });
    response.cookie("logged_in", "yes", { maxAge: 86400000 * 2 });
    response.cookie("role", user.role, { maxAge: 86400000 * 2 });

    response.send({ token });
  }
}
