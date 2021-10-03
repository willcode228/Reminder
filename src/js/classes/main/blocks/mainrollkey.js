import { addTask } from "../../../asset/bll";
import ListKey from "../../extends/listkey";
import InfoModal from "./infomodal";

class MainRollKey extends ListKey{ 
    constructor(selector, data, index, mainDataUpdate, deleteTaskUpdate){
        super(selector);
        this.data = data;
        this.bllIndex = index;
        this.update = mainDataUpdate;
        this.delete = deleteTaskUpdate;

        this._el.addEventListener('keydown', this.throttle(this.keyDelete.bind(this), 200));
        this._el.addEventListener('keydown', this.throttle(this.keyCompleted, 300));
        this._el.addEventListener('keydown', this.renameFocus.bind(this));
        this._el.addEventListener('keydown', this.enter.bind(this));
        this._el.addEventListener('copy', this.throttle(this.copy.bind(this), 550));
        this._el.addEventListener('paste', this.throttle(this.paste.bind(this), 550));
    }

    keyCompleted(e) {
        if(e.keyCode == 32){
            if(!e.target.classList.contains('task')) return;
            e.target.querySelector('input').click();
        }
    }

    renameFocus(e) {
        const element = document.activeElement;

        if(e.key == 'Tab'){ 
            e.preventDefault();
            if(!element.classList.contains('main__list-task')) return;
            let taskText = element.querySelector('p');
            taskText.contentEditable = true;
            taskText.focus();
        }
    }

    enter(e) {
        const element = document.activeElement;
        if(e.key == 'Enter'){
            //! prevent add "\n (Enter key)" to the task text after fast focusing on element
            e.preventDefault();
            if(!element.classList.contains('task-text')) return;

            if(element.textContent.trim()){
                addTask(this.bllIndex);
                this.update();
            }else{
                element.blur();
            }
        }
    }

    copy(e) {
        console.log(e.target)
        const element = document.activeElement.closest('.main__list-task');
        if(!element) return;

        let [index, type] = this.taskInfo(element);

        if(type == 'completed') return;
        let taskData = this.data.template[type][index];

        navigator.clipboard.writeText(taskData.str)
        .then(() => {
            new InfoModal('Напоминание скопировано!').init();
        })
        .catch(err => {
            new InfoModal('Напоминание не удалось скопировать!').init();
        });
    }

    paste(e) {
        let element = e.target;
        if(element.contentEditable === 'true') return;

        navigator.clipboard.readText()
        .then(text => {

            if(!text) return;

            addTask(this.bllIndex, text);
            this.update();
            new InfoModal('Напоминание вставлено!').init();
        })
        .catch(err => {
            new InfoModal('Не удалось вставить напоминание!').init();
        });
    }
}
export default MainRollKey;