import { parallel } from "async";
import ProductService from "../services/productService";
import { Account } from "./accounts";
import { Counter } from "./counter";

export class UniqueProducts {
  private counterObj: Counter;

  constructor(private inputs, private accountNumber, private user) {
    this.counterObj = new Counter();
  }

  async save() {
    const products = this.inputs[this.accountNumber];

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const existProduct = await ProductService.getProductByVoucherCode(
        product.voucherCode
      );

      if (!existProduct) {
        parallel([
          () =>
            this.counterObj.update(product.productName, product.productPrice),
          () =>
            ProductService.saveProduct(
              product,
              this.accountNumber,
              this.user._id
            ),
        ]);
      }
    }
    return this.counterObj.overview;
  }

  saveAccount() {
    const overview = this.counterObj.overview;
    if (overview.items != 0)
      new Account(this.accountNumber, overview.totalPrice, this.user.username);
  }
}
