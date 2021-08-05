import { login } from "./interfaces/interfaces";
import { Notifications } from "../utils/notifications";
import { validateLogin } from "../utils/validator";

export class Login extends Notifications {
  private username: HTMLInputElement;
  private password: HTMLInputElement;
  private button: HTMLButtonElement;

  constructor() {
    super();
    this.username = document.querySelector("#username")!;
    this.password = document.querySelector("#password")!;
    this.button = document.querySelector(".btn")!;
    this.configure();
  }

  protected async run() {
    try {
      const data = this.preRequest();
      const response = await this.request(data);
      await this.operation(response);
    } catch (error) {
      this.errorNotification(error.message);
    }
  }

  preRequest() {
    const usernameValue = this.username.value.trim();
    const passwordValue = this.password.value;

    validateLogin(usernameValue, passwordValue);

    return { email: usernameValue, password: passwordValue };
  }

  async request(data: login) {
    const url = "/auth/login";
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async operation(response: Response) {
    this.clearText();

    if (response.ok) return (window.location.href = "/home");

    const error = await response.json();
    throw new Error(error.message);
  }

  clearText() {
    this.username.value = "";
    this.password.value = "";
  }

  private configure() {
    this.button.addEventListener("click", async () => this.handler());
    document.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.handler();
      }
    });
  }

  private handler() {
    this.run();
  }
}
