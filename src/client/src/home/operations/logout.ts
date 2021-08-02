import { Template } from "./template";

export class Logout extends Template {
  constructor() {
    super(document.querySelector(".logout")!);
  }

  preRequest() {}

  async request() {
    const url = "/auth/logout";
    return await fetch(url);
  }

  operation() {
    document.location.href = "/";
  }

  async display() {}

  keyboardListener() {}
}
