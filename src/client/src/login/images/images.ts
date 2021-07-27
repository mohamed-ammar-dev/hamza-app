import Login from "../../../images/login.svg";
import User from "../../../images/user.png";
import Lock from "../../../images/lock.png";
import FavIcon from "../../../images/chart.png";

export class Images {
  private login: HTMLImageElement;
  private user: HTMLImageElement;
  private lock: HTMLImageElement;
  private link: HTMLLinkElement;

  constructor() {
    this.login = document.querySelector("#svg")!;
    this.user = document.querySelector("#user-icon")!;
    this.lock = document.querySelector("#lock-icon")!;
    this.link = document.querySelector("link[rel~='icon']")!;

    this.render();
  }

  render() {
    this.addFavIcon();
    this.addLoginSvg();
    this.addUserIcon();
    this.addLockIcon();
  }

  private addFavIcon() {
    this.link = document.createElement("link");
    this.link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(this.link);
    this.link.href = FavIcon;
  }

  private addLoginSvg() {
    this.login.src = Login;
  }

  private addUserIcon() {
    this.user.src = User;
  }

  private addLockIcon() {
    this.lock.src = Lock;
  }
}
