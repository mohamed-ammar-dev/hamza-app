import { getCookie } from "../../utils/cookies";
import { formatAMPM } from "../../utils/date";
import { accounts } from "../interfaces/interfaces";
import { DeleteAccount } from "../operations/deleteAccount";
import { Tables } from "./tables";

export class Accounts extends Tables {
  role: string;
  constructor() {
    super(document.querySelector(".accounts-id-nav")!);
    this.role = getCookie("role");
  }

  display(products: accounts): void {
    const accountsTable = document.querySelector("#accounts-id-table")!;
    const tableBody = document.querySelector("#accounts-id-table tbody")!;
    const tb = document.createElement("tbody")!;

    tableBody.remove();
    accountsTable.appendChild(tb);

    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      const [date, time] = formatAMPM(element.date);

      const tr = document.createElement("tr");
      const tdDate = document.createElement("td");
      const tdTime = document.createElement("td");
      const price = document.createElement("td");
      const tdAccountID = document.createElement("td");
      const tdUsername = document.createElement("td");
      const tdDelete = document.createElement("td");
      const deleteBtn = document.createElement("button");

      tdDate.classList.add("column3");
      tdDate.innerHTML = date;

      tdTime.classList.add("column3");
      tdTime.innerHTML = time;

      price.classList.add("column3");
      price.innerHTML = `${element.price}$`;

      tdAccountID.classList.add("column3");
      tdAccountID.innerHTML = element.accountNumber.toString();

      tdUsername.classList.add("column3");
      tdUsername.innerHTML = element.username;

      tdDelete.classList.add("column3");

      if (this.role == "user") deleteBtn.disabled = true;
      if (this.role == "admin") {
        deleteBtn.classList.add("btn");
        deleteBtn.setAttribute("id", element._id);
      }
      deleteBtn.innerHTML = "remove";

      tb.appendChild(tr);
      tr.appendChild(tdDate);
      tr.appendChild(tdTime);
      tr.appendChild(tdUsername);
      tr.appendChild(tdAccountID);
      tr.appendChild(price);
      tr.appendChild(tdDelete);

      tdDelete.appendChild(deleteBtn);
      tdDelete.addEventListener("click", () => {
        new DeleteAccount(deleteBtn.getAttribute("id")!).run();
        tr.remove();
      });
    }
  }
}
