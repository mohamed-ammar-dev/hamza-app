import SignUp from "../../../images/signup.png";
import User from "../../../images/user.png";
import Email from "../../../images/email.png";
import Lock from "../../../images/lock.png";
import Password2 from "../../../images/password2.png";
import FavIcon from "../../../images/chart.png";

export class Images {
  private signup: HTMLImageElement;
  private user: HTMLImageElement;
  private lock: HTMLImageElement;
  private email: HTMLImageElement;
  private password2: HTMLImageElement;
  private link: HTMLLinkElement;

  constructor() {
    this.signup = document.querySelector(".signup-image img")!;
    this.user = document.querySelector("#user-icon")!;
    this.lock = document.querySelector("#lock-icon")!;
    this.email = document.querySelector("#email-icon")!;
    this.password2 = document.querySelector("#password2-icon")!;
    this.link = document.querySelector("link[rel~='icon']")!;

    this.render();
  }

  render() {
    this.addFavIcon();
    this.addSignupPng();
    this.addUserIcon();
    this.addPasswordConfirmationIcon();
    this.addEmailIcon();
    this.addLockIcon();
  }

  private addFavIcon() {
    this.link = document.createElement("link");
    this.link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(this.link);
    this.link.href = FavIcon;
  }

  private addSignupPng() {
    this.signup.src = SignUp;
  }

  private addUserIcon() {
    this.user.src = User;
  }

  private addPasswordConfirmationIcon() {
    this.password2.src = Password2;
  }

  private addEmailIcon() {
    this.email.src = Email;
  }

  private addLockIcon() {
    this.lock.src = Lock;
  }
}
