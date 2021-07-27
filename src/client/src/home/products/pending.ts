import { Template } from "./template";

export class PendingProducts extends Template {
  async request() {
    const url = "/products/pending";
    const response = await fetch(url);
    return response;
  }

  displayMethod() {
    return this.displayFactory.pendingProducts();
  }
  keyboardListener() {}
}
