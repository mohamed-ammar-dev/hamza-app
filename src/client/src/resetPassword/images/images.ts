import Password2 from "../../../images/password2.png";
import Lock from "../../../images/lock.png";
import LockBig from "../../../images/lock-reset.png";
import FavIcon from "../../../images/chart.png";

export class Images {
  private lockBig: HTMLImageElement;
  private password: HTMLImageElement;
  private password2: HTMLImageElement;
  private link: HTMLLinkElement;

  constructor() {
    this.lockBig = document.querySelector("#lock-big")!;
    this.password = document.querySelector("#password-icon")!;
    this.password2 = document.querySelector("#password2-icon")!;
    this.link = document.querySelector("link[rel~='icon']")!;

    this.render();
  }

  render() {
    this.addFavIcon();
    this.addPasswordIcon();
    this.addPassword2Icon();
    this.addlockBigIcon();
  }

  private addFavIcon() {
    this.link = document.createElement("link");
    this.link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(this.link);
    this.link.href = FavIcon;
  }

  private addPasswordIcon() {
    this.password.src = Lock;
  }

  private addPassword2Icon() {
    this.password2.src = Password2;
  }

  private addlockBigIcon() {
    this.lockBig.src = LockBig;
  }
}
