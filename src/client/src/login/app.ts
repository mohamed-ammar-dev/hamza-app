import { Images } from "./images/images";
import { Login } from "./login";

if (document.cookie) document.location.href = "/home";

new Images();
new Login();
