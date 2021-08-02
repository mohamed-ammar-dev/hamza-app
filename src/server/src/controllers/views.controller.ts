import { Request, Response } from "express";

export default class Views {
  static async renderHome(_: Request, response: Response) {
    response.render("home.hbs");
  }
  static async renderLogin(_: Request, response: Response) {
    response.render("login.hbs");
  }
  static async renderForgotPassword(_: Request, response: Response) {
    response.render("forgotPassword.hbs");
  }
  static async renderResetPassword(_: Request, response: Response) {
    response.render("resetPassword.hbs");
  }
}
