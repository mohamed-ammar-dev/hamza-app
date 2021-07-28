import { productDetails } from "../interfaces/interfaces";
import { Tables } from "./tables";

export class MoreInformation extends Tables {
  constructor() {
    super(document.querySelector(".more-information-nav")!);
  }

  display(products: productDetails) {
    const moreInfoTable = document.querySelector("#more-information-table")!;
    const tableBody = document.querySelector("#more-information-table tbody")!;
    const tb = document.createElement("tbody");

    tableBody.remove();
    moreInfoTable.appendChild(tb);

    for (let i = 0; i < products.length; i++) {
      const element = products[i];

      const tr = document.createElement("tr");
      const tdUsername = document.createElement("td");
      const tdProduct = document.createElement("td");
      const tdQuantity = document.createElement("td");
      const tdTotal = document.createElement("td");

      tdUsername.classList.add("column3");
      tdUsername.innerHTML = element.username;

      tdProduct.classList.add("column3");
      tdProduct.innerHTML = element.product;

      tdQuantity.classList.add("column3");
      tdQuantity.innerHTML = element.items.toString();

      tdTotal.classList.add("column3");
      tdTotal.innerHTML = `${element.totalPrice}$`;

      tb.appendChild(tr);
      tr.appendChild(tdUsername);
      tr.appendChild(tdProduct);
      tr.appendChild(tdQuantity);
      tr.appendChild(tdTotal);
    }
  }
}
