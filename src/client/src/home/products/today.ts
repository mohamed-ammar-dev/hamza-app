import { Template } from "./template";

export class TodayProducts extends Template {
  async request() {
    const url = "/products/today";
    const response = await fetch(url);
    return response;
  }

  displayMethod() {
    return this.displayFactory.todayProducts();
  }
  keyboardListener() {}
}
