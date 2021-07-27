import { Images } from "./images/images";
import { Login } from "./login";

console.log(document.cookie);

if (document.cookie) document.location.href = "/home";

new Images();
new Login();
