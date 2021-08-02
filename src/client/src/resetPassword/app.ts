import { Images } from "./images/images";
import "../../css/shared.css";
import "../../css/forgotPassword.css";
import { NotificationComponent } from "../components/notification";
import { ResetPassword } from "./resetPassword";

new Images();
new NotificationComponent().render();
new ResetPassword();
