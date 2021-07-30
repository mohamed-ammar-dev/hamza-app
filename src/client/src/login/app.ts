import { Images } from "./images/images";
import { Login } from "./login";
import "../../css/shared.css";
import "../../css/login.css";
import { NotificationComponent } from "../components/notification";

if (document.cookie) document.location.href = "/home";

new Images();
new NotificationComponent().render();
new Login();
