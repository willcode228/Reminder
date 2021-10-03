import { mainHeader } from "../../../utils/template";
import Block from "../../extends/block";
import MainHeaderAdd from "./mainheaderadd";
import MainHeaderHide from "./mainheaderhide";

class MainHeader extends Block{
    constructor(selector, data, index, update) {
        super(selector);
        this.data = data;
        this.index = index;
        this.update = update;
    }

    clearTemplate() {
        this._el.innerHTML = '';
    }

    render() {
        this.clearTemplate();
        this._el.insertAdjacentHTML('beforeend', this.template);

        new MainHeaderAdd('.main__header-add', this.index, this.update);
        new MainHeaderHide('.main__header-hide', this.index, this.update);
    }

    get template() {
        return mainHeader(this.data.listTitle,
                        this.data.completeTaskVisible,
                        Object.keys(this.data.template.uncompleted).length,
                        Object.keys(this.data.template.completed).length);
    }
}

export default MainHeader;