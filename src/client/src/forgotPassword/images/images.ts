import Email from "../../../images/email.png";
import LockBig from "../../../images/lock-big.png";
import FavIcon from "../../../images/chart.png";

export class Images {
  private email: HTMLImageElement;
  private lockBig: HTMLImageElement;
  private link: HTMLLinkElement;

  constructor() {
    this.email = document.querySelector("#email-icon")!;
    this.lockBig = document.querySelector("#lock-big")!;
    this.link = document.querySelector("link[rel~='icon']")!;

    this.render();
  }

  render() {
    this.addFavIcon();
    this.addEmailIcon();
    this.addlockBigIcon();
  }

  private addFavIcon() {
    this.link = document.createElement("link");
    this.link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(this.link);
    this.link.href = FavIcon;
  }

  private addEmailIcon() {
    this.email.src = Email;
  }

  private addlockBigIcon() {
    this.lockBig.src = LockBig;
  }
}
