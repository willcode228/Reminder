import Block from "../extends/block";
import { main } from "../../utils/template";
import MainHeader from "./blocks/mainheader";
import MainRollView from "./blocks/mainrollview";
import MainRollRep from "./blocks/mainrollrep";
import AsideRollView from "../aside/blocks/asiderollview";
import MainRollKey from "./blocks/mainrollkey";
import MainRollDrag from './blocks/mainrolldrag';

class Main extends Block{
    constructor(selector, data, index) {
        super(selector)
        this.data = data;
        this.index = index;
        this.localeData = this.data[this.index];
    }

    clearTemplate() {
        this._el.innerHTML = '';
    }
    
    render() {
        this.clearTemplate();
        this._el.insertAdjacentHTML('beforeend', this.template);

        this._el.style.setProperty('--accent', `var(--${this.localeData?.accentColor})`);
        
        if(!this.localeData) return;

        const mainDataUpdate = (updateType) => {
            new AsideRollView('.aside__list-list').render(this.data, this.index);
            header.render();
            roll.noteUpdate(this.localeData);

            if(updateType == 'all') {
                roll.render(this.localeData);
            }
        }


        const delTaskUpdate = (element) => {
            mainEvent.delete(element)
        }
        
        const header = new MainHeader('.main__header', this.localeData, this.index, mainDataUpdate);
        const roll = new MainRollView('.main__list');
        
        header.render();
        roll.render(this.localeData)
        roll.noteUpdate(this.localeData);
        
        const mainEvent = new MainRollRep('.main__list', this.index, mainDataUpdate);
        new MainRollDrag('.main__list', this.index, mainDataUpdate);
        new MainRollKey('.main__list', this.data[this.index], this.index, mainDataUpdate, delTaskUpdate);
    } 
    
    get template() {
        return main(this.localeData);
    }
}

export default Main;