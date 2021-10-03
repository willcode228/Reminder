import { addTab } from "../../../asset/bll";
import Block from "../../extends/block";

class AsideAdd extends Block{
    constructor(selector) {
        super(selector);
        this._el.addEventListener('click', addTab);
    }
}

export default AsideAdd;