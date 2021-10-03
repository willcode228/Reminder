import { tab } from "../../../utils/template";
import Block from "../../extends/block";

class AsideRollView extends Block{
    constructor(selector) {
        super(selector);
    }

    render(data, index) {
        this.clearTemplate();
        
        const keys = Object.keys(data);
        if(!keys.length) return;

        keys.forEach((obj, i) => {
            this._el.insertAdjacentHTML('beforeend', tab(
                    keys[i], 
                    data[obj].listTitle, 
                    Object.keys(data[obj].template.uncompleted).length,
                    data[obj].accentColor,
                    false,
                    index && index == keys[i]
            ));
        });
    }

    clearTemplate() {
        this._el.innerHTML = '';
    }
}

export default AsideRollView;
