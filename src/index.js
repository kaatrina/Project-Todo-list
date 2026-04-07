import "./style-mainPage.css";
import "./sidebar.css";
import "./header.css";
import "./projectsPage.css";
import "./mainPage.css";
import "./todosPage.css";
import "./dialog.css"

import { projectsData, loadFromLocalStorage } from "./data.js";
import {headerLoad} from "./header.js"
import { mainLoad } from "./mainPage.js";
import { sidebarLoad } from "./sidebar.js";

loadFromLocalStorage();

mainLoad()

sidebarLoad()

headerLoad()

