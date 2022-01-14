import { changeTaskStatus, delTask, renameTask } from "../../../asset/bll";
import { taskLink } from "../../../utils/template";
import ListRep from "../../extends/listrep";
import { taskInfo } from '../../../utils/taskInfo';

class MainRollRep extends ListRep {
    constructor(selector, index, mainDataUpdate) {
        super(selector);
        this.bllIndex = index;
        this.update = mainDataUpdate;

        this._el.addEventListener('click', this.completed.bind(this));
        this._el.addEventListener('click', this.trash.bind(this));
        this._el.addEventListener('mousedown', this.textFocus.bind(this));
        this._el.addEventListener('focusout', this.textBlur.bind(this));
        this._el.addEventListener('input', this.rename.bind(this));
    }

    trash(e) {
        let element = e.target.closest('.task-delete');
        if (!element) return;

        this.delete(element.closest('li'));
    }

    textFocus(e) {
        if (!e.target.classList.contains('task-text')) return;
        e.target.contentEditable = true;
        e.target.focus();
    }

    textBlur(e) {
        const element = e.target;
        if (!element.classList.contains('task-text')) return;

        element.textContent = element.textContent.trim();

        const text = element.textContent,
            link = /^((ftp|http|https):\/\/)|(www\.)/;

        if (link.test(text)) {
            element.innerHTML = taskLink(text);
        }

        if (!element.textContent) {
            this.delete(element.closest('li'));
        }

        element.contentEditable = false;
    }

    delete(element) {
        if (!element.classList.contains('main__list-task')) return;

        let [taskIndex, type] = taskInfo(element);
        delTask(this.bllIndex, taskIndex, type);
        this.focus(element, this.focusDirection(element));
        this.update();
    }

    rename(e) {
        const element = e.target;

        if (!element.classList.contains('task-text')) return;
        let [taskIndex, type] = taskInfo(element.closest('li'));

        renameTask(this.bllIndex, taskIndex, type, element.textContent);
        element.setAttribute('title', element.textContent);
    }

    completed(e) {
        let element = e.target;

        if (!element.classList.contains('task__checkbox')) return;

        let task = element.closest('li');
        let [taskIndex, type, reverseType] = taskInfo(task);

        task.classList.remove(type);
        task.classList.add(reverseType);

        setTimeout(() => {
            changeTaskStatus(this.bllIndex, taskIndex, type, reverseType);
            this.update();
            this.focus(task, this.focusDirection(task));
        }, 300);
    }

}

export default MainRollRep;