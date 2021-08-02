import { Notifications } from "../utils/notifications";
import { validateEmail } from "../utils/validator";

export class ResetPassword extends Notifications {
  private email: HTMLInputElement;
  private button: HTMLButtonElement;

  constructor() {
    super();
    this.email = document.querySelector("#email")!;
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
    const emailValue = this.email.value.trim();

    validateEmail(emailValue);
    return emailValue;
  }

  async request(email: string) {
    const url = `/password/token/${email}`;
    return await fetch(url);
  }

  async operation(response: Response) {
    this.clearText();

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
    this.email.value = "";
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
