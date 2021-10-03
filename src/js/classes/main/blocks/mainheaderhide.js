import { changeCompleteTaskVisible } from "../../../asset/bll";
import Block from "../../extends/block";

class MainHeaderHide extends Block{
    constructor(selector, index, update) {
        super(selector);
        this.index = index;
        this.update = update;

        this._el.addEventListener('click', this.changeVisibility.bind(this));
    }

    changeVisibility() {
        changeCompleteTaskVisible(this.index);
        this.update('all');
    }
}

export default MainHeaderHide;