import { asideRollAdd, asideRollRemove, mainRollAdd, mainRollRemove } from "../utils/domInteraction";

let bll = {};

if(localStorage.getItem('todos')) {
    bll = JSON.parse(localStorage.getItem('todos'));
}

export default bll;

export const addTab = () => {

    let newTaskList = {
        listTitle: 'Новый список',
        completeTaskVisible: true,
        accentColor: 'blue',

        template: {
            completed: {}, 
            uncompleted: {}
        }

    };

    let index = lastObjIndex(bll);
    bll[index] = newTaskList;

    toStorage(bll);

    asideRollAdd(index, bll[index]);
}

export const delTab = (index) => {
    delete bll[index];
    toStorage(bll);
    
    asideRollRemove(index);
}

export const renameTab = (index, text) => {
    text = text.trim();
    bll[index].listTitle = text;
    toStorage(bll);
}

export const addTask = (bllIndex, text='', type='uncompleted') => {
    let completedStatus = type == 'completed' ? true : false;

    let newTask = {str: text, completed: completedStatus},
        data = bll[bllIndex].template[type];

    let index = lastObjIndex(data);
    data[index] = newTask;

    toStorage(bll);

    //if complete task visible is false and we change uncompleted task to completed
    //we mustn't add this new completed task to html only to bll
    if(!bll[bllIndex].completeTaskVisible && type == 'completed') return;
    mainRollAdd(index, text, completedStatus);
}

export const delTask = (bllIndex, taskIndex, type) => {
    delete bll[bllIndex].template[type][taskIndex];
    toStorage(bll);

    mainRollRemove(taskIndex, type);
}

export const dragTask = (oldTaskObj, newBllIndex) => {
    const {taskId, taskType, oldBllIndex} = oldTaskObj;

    if(oldBllIndex === newBllIndex) return;

    const {str, isCompleted} = bll[oldBllIndex].template[taskType][taskId];
    const completedStatus = isCompleted ? 'completed' : 'uncompleted';

    delTask(oldBllIndex, taskId, taskType);
    addTask(newBllIndex, str, completedStatus);
}

export const changeTaskStatus = (bllIndex, taskIndex, type, reverseType) => {
    let text = bll[bllIndex].template[type][taskIndex].str;
    delTask(bllIndex, taskIndex, type);
    addTask(bllIndex, text, reverseType);
}

export const renameTask = (bllIndex, taskIndex, type, text) => {
    bll[bllIndex].template[type][taskIndex].str = text.trim();
    toStorage(bll);
}

export const changeCompleteTaskVisible = (bllIndex) => {
    bll[bllIndex].completeTaskVisible = !bll[bllIndex].completeTaskVisible;
    toStorage(bll);
}

export const changeAccentColor = (bllIndex, newColor) => {
    bll[bllIndex].accentColor = newColor;
    toStorage(bll);
    
}

const toStorage = (data) => {
    localStorage.setItem('todos', JSON.stringify(data));
}

const lastObjIndex = (obj) => {
    let keys = Object.keys(obj);
    return keys.length ? Math.max(...keys) + 1 : 0;
}

