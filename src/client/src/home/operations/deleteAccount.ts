import { Template } from "./template";

export class DeleteAccount extends Template {
  constructor(private account_id: string) {
    super();
  }

  preRequest() {}

  async request() {
    const url = "/accounts";
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ account_id: this.account_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  operation() {}

  async display() {}

  keyboardListener() {}
}
