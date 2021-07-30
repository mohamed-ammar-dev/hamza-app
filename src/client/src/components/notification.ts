export class NotificationComponent {
  render() {
    const parent = document.createElement("div");
    const msgBox = document.createElement("div");
    const content = document.createElement("div");
    const close = document.createElement("a");

    close.innerHTML = "CLOSE";

    parent.classList.add("msgbox-area");
    msgBox.classList.add("msgbox-box", "red");

    content.classList.add("msgbox-content");
    close.classList.add("msgbox-close");

    parent.appendChild(msgBox);
    msgBox.appendChild(content);
    msgBox.appendChild(close);

    const body = document.querySelector("body")!;
    body.appendChild(parent);
  }
}
