import { tab, task } from "./template";

export const asideRollAdd = (index, data) => {
    const list = document.querySelector('.aside__list-list');
    list.insertAdjacentHTML('beforeend', tab(index, data.listTitle, Object.keys(data.template.uncompleted).length, 'blue', true));

    let newListTab = list.lastElementChild.querySelector('input');
    newListTab.focus();
}

export const asideRollRemove = (index) => {
    const tab = document.querySelector(`.aside__list-item[data-counter="${index}"]`);
    tab.classList.add('hide');

    setTimeout(() => {
        tab.remove();
    }, 200);
}

export const mainRollAdd = (index, text, type) => {
    let status = type ? 'completed' : 'uncompleted';
    let list = document.querySelector(`.main__list-${status}`);

    list.insertAdjacentHTML('beforeend', task(index, text, true, type));
    //if task isn't new it has text
    //we add focus to the task text
    //only if it new
    if(text) return;
    const newTaskText = list.lastElementChild.querySelector('p');
    newTaskText.contentEditable = 'true';     
    newTaskText.focus();
}

export const mainRollRemove = (index, type) => {
    const task = document.querySelector(`.main__list-task[data-${type}="${index}"]`);
    
    task.classList.add('hide');
    task.style.marginTop = `-${window.getComputedStyle(task).height}`;

    setTimeout(() => {
        task.remove();
    }, 200);
}
