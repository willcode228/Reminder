import Block from './block';

class ListRep extends Block{
    constructor(selector) {
        super(selector);
        
    }

    focusDirection(task) {
        return task.parentElement.lastElementChild == task ? 'previous' : 'next';
    }

    focus(element, direction='next') {
        let tasks = element.closest('.lists').querySelectorAll('li');

        for(let i = 0; i < tasks.length; i++){
            let task = tasks[i];

            if(element && task == element && direction == 'next') {
                element.blur();
                tasks[i + 1]?.focus();

                if(!tasks[i + 1]){
                    tasks[0]?.focus();
                }

            }

            if(element && task == element && direction == 'previous') {
                element.blur();
                tasks[i - 1]?.focus();

                if(!tasks[i - 1]){
                    tasks[tasks.length - 1]?.focus();
                }

            }

        }
    }

    throttle(f, t) {
        f.flag = 1;
        return (args) => {
            if(f.flag) {
                f.flag = 0;
                f(args);
                setTimeout(() => { 
                    f.flag = 1 
                }, t)
            }
        }
    }

}

export default ListRep;
