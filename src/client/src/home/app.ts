import { Images } from "./images/images";
import { TodayProducts } from "./products/today";
import { PendingProducts } from "./products/pending";
import { MoreInformation } from "./products/moreInformation";
import { Accounts } from "./products/accounts";
import { Search } from "./operations/search";
import { Download } from "./operations/download";
import { Converter } from "./operations/converter";
import "../../css/shared.css";
import "../../css/home.css";
import { NotificationComponent } from "../components/notification";

if (!document.cookie) document.location.href = "/";

new Images().render();

Promise.all([new TodayProducts().run(), new PendingProducts().run()]);

new NotificationComponent().render();
new MoreInformation();
new Accounts();
new Search();
new Download();
new Converter();
