import { Notifications } from "../utils/notifications";
import { validateSignUp } from "../utils/validator";

export class SignUp extends Notifications {
  private username: HTMLInputElement;
  private email: HTMLInputElement;
  private password: HTMLInputElement;
  private password2: HTMLInputElement;
  private button: HTMLButtonElement;

  constructor() {
    super();
    this.username = document.querySelector("#name")!;
    this.email = document.querySelector("#email")!;
    this.password = document.querySelector("#password")!;
    this.password2 = document.querySelector("#password2")!;
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
    const emailValue = this.email.value;
    const passwordValue = this.password.value;
    const passwordConfirmationValue = this.password2.value;

    validateSignUp(
      usernameValue,
      emailValue,
      passwordValue,
      passwordConfirmationValue
    );

    return {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
    };
  }

  async request(data: object) {
    const url = "/auth/signup";
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

    if (response.ok) return this.notification("Sign up successfully.");

    const error = await response.json();
    throw new Error(error.message);
  }

  clearText() {
    this.username.value = "";
    this.email.value = "";
    this.password2.value = "";
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
