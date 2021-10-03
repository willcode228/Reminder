import App from "./classes/app";
import bll from "./asset/bll";
//Styles
import "../scss/style.scss"
import "../../node_modules/normalize.css/normalize.css";

new App('.app', bll).render();