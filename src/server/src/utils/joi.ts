import {
  array,
  object,
  string,
  number,
  ArraySchema,
  ObjectSchema,
  date,
} from "joi";

export class Joi {
  private static instance: Joi;
  saveProductsSchema: ArraySchema;
  accountsQuerySchema: ObjectSchema;
  signUpSchema: ObjectSchema;
  loginSchema: ObjectSchema;

  private constructor() {
    this.saveProductsSchema = this.saveProducts();
    this.accountsQuerySchema = this.accountsQuery();
    this.signUpSchema = this.signUp();
    this.loginSchema = this.login();
  }

  public static getInstance(): Joi {
    if (!Joi.instance) {
      Joi.instance = new Joi();
    }
    return Joi.instance;
  }

  private signUp() {
    return object({
      username: string().min(3).max(30).required(),

      email: string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),

      password: string().min(6).max(30).required(),
    });
  }

  private login() {
    return object({
      email: string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),

      password: string().required(),
    });
  }

  private saveProducts() {
    return array().items(
      object({
        productName: string().required(),
        voucherCode: string().required(),
        productPrice: number().required(),
      })
    );
  }

  private accountsQuery() {
    return object({
      date: date(),
      accountNumber: number(),
    }).without("date", "accountNumber");
  }
}
