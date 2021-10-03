import { mainRollTemplate, task } from "../../../utils/template";
import Block from "../../extends/block";

class MainRollView extends Block{
    constructor(selector) {
        super(selector);
    }

    dataKeys(data) {
        const [dataCompleted, dataUncompleted] = this.dataObj(data);
        return [Object.keys(dataCompleted), Object.keys(dataUncompleted)];
    }

    dataObj(data) {
        return [data.template.completed, data.template.uncompleted];
    }

    render(data) {

        this.clearTemplate();
        this.noteUpdate(data);

        const [dataCompleted, dataUncompleted] = this.dataObj(data);
        const [keysCompleted, keysUncompleted] = this.dataKeys(data);

        if(keysUncompleted.length) {
            keysUncompleted.forEach((obj) => {
                this._el.querySelector('.main__list-uncompleted').insertAdjacentHTML('beforeend', 
                        task(obj, dataUncompleted[obj].str));
            });
        }

        if(data.completeTaskVisible && keysCompleted.length) {
            keysCompleted.forEach((obj) => {
                this._el.querySelector('.main__list-completed').insertAdjacentHTML('beforeend', 
                        task(obj, dataCompleted[obj].str, false, true));
            });
        }
    }

    noteUpdate(data) {
        const noTaskEl = this._el.querySelector('.main__noTasks');
        const [keysCompleted, keysUncompleted] = this.dataKeys(data);

        if(keysUncompleted.length || keysCompleted.length && data.completeTaskVisible) {
            noTaskEl.classList.remove('active');
        } else {
            noTaskEl.classList.add('active');
        }

        if(keysCompleted.length && !data.completeTaskVisible) {
            noTaskEl.textContent = 'Все выполнено';
        }
    }
    
    clearTemplate() {
        this._el.innerHTML = this.template;
    }

    get template() {
        return mainRollTemplate();
    }
}

export default MainRollView;