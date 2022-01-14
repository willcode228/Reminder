import { delTab, dragTask, renameTab } from "../../../asset/bll";
import ListRep from "../../extends/listrep";
import Main from "../../main/main";
import DelTabPrompt from "./deltabprompt";
import TabProperty from "./tabproperty";

class AsideRollRep extends ListRep{
    constructor(selector, data) {
        super(selector);
        this.data = data;

        this._el.addEventListener('focusin', () => {
            this.taskListRender();
            this.openedStatus();
        });
        this._el.addEventListener('input', this.rename.bind(this));
        this._el.addEventListener('dblclick', this.openPropertyModal.bind(this));
        this._el.addEventListener('click', this.trash.bind(this));

    }

    trash(e) {
        let element = e.target.closest('.tab-delete');
        if(!element) return;

        this.delete(element.parentElement);
    }

    openPropertyModal(e) {
        let element = e.target.closest('.aside__list-circle');
        if(!element) return;

        let parent = element.parentElement;
        let index = parent.dataset.counter;
        let data = this.data[index];

        const update = (text, accent) => {
            if(accent) {
                element.style.background = `var(--${accent})`;
            }
            renameTab(index, text);
            parent.querySelector('.aside__list-input').value = text;
            this.taskListRender('modal');
        }

        new TabProperty('.property', data.accentColor, data.listTitle, index, update).init();
    }
    
    delete(element) {
        if(!element.classList.contains('tab')) return;

        let index = element.dataset.counter;
        
        const update = () => {
            this.focus(element, this.focusDirection(element));
            delTab(index);
            this.taskListRender();
        }
        
        new DelTabPrompt('.prompt', this.data[index], index, update).init();
    }
    
    openedStatus() {
        let element = document.activeElement.closest('.tab');
        
        let tabs = document.querySelectorAll('.tab');
        if(!tabs.length) return;
        
        tabs.forEach(el => el.classList.remove('opened'));
        element.classList.add('opened');
    }
    
    taskListRender(type) {
        if(!type) {
            this.openedStatus();
        }

        let element = this._el.querySelector('.opened');

        let index = element?.dataset.counter;
        new Main('.main', this.data, index).render();
    }

    rename(e) {
        const element = e.target;
        
        if(!element.classList.contains('aside__list-input')) return;
        let taskIndex = element.closest('li').dataset.counter,
            value = element.value.trim();

        renameTab(taskIndex, value);
        element.setAttribute('title', value);

        this.taskListRender();
    }

}

export default AsideRollRep;