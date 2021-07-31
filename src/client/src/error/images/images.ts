import FavIcon from "../../../images/chart.png";

export class Images {
  private link: HTMLLinkElement;

  constructor() {
    this.link = document.querySelector("link[rel~='icon']")!;

    this.render();
  }

  render() {
    this.addFavIcon();
  }

  private addFavIcon() {
    this.link = document.createElement("link");
    this.link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(this.link);
    this.link.href = FavIcon;
  }
}
