import { Notifications } from "../utils/notifications";
import { validatResetPassword } from "../utils/validator";

export class ResetPassword extends Notifications {
  private password: HTMLInputElement;
  private password2: HTMLInputElement;
  private button: HTMLButtonElement;

  constructor() {
    super();
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
    const passwordlValue = this.password.value.trim();
    const password2lValue = this.password2.value.trim();

    this.clearText();

    validatResetPassword(passwordlValue, password2lValue);
    return { password: passwordlValue };
  }

  async request(password: object) {
    const url = `/password/reset/${this.extractToken()}`;
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(password),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async operation(response: Response) {
    if (response.ok)
      return this.notification(
        `Check your inbox for the next steps. 
        If you don't receive an email, 
        and it's not in your spam folder 
        this could mean you signed up with a different address.`
      );

    const error = await response.json();
    throw new Error(error.message);
  }

  clearText() {
    this.password.value = "";
    this.password2.value = "";
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

  private extractToken() {
    const url = new URL(location.href);
    const token = url.searchParams.get("token");

    if (!token) throw new Error("Invalid request.");

    return token;
  }
}
