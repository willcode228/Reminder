import { addTask } from "../../../asset/bll";
import Block from "../../extends/block";

class MainHeaderAdd extends Block{
    constructor(selector, index, update) {
        super(selector);
        this.index = index;
        this.update = update;

        this._el.addEventListener('click', this.add.bind(this));
    }

    add() {
        addTask(this.index);
        this.update();
    }
}

export default MainHeaderAdd;