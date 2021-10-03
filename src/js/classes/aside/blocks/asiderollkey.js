import ListKey from "../../extends/listkey";

class AsideRollKey extends ListKey{
    constructor(selector, update) {
        super(selector);
        this.delete = update;

        this._el.addEventListener('keydown', this.enter.bind(this));
        this._el.addEventListener('keydown', this.throttle(this.keyDelete.bind(this), 200));
    }

    enter(e) {
        const element = document.activeElement;
        if(!element.classList.contains('aside__list-input')) return;

        if(e.key == 'Enter') {
            element.closest('li').focus();
        }
    }
}

export default AsideRollKey;