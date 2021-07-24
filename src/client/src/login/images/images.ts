import Login from "../../../images/login.svg";

export class Images {
  private login: HTMLImageElement;

  constructor() {
    this.login = document.querySelector("#svg")!;
    this.render();
  }

  render() {
    this.loginSvg();
  }

  private loginSvg() {
    this.login.src = Login;
  }
}
