import ListRep from "./listrep";

class ListKey extends ListRep{
    constructor(selector) {
        super(selector);
        
        this._el.addEventListener('keydown', this.arrowClick.bind(this));
    }

    keyDelete(e) {
        const element = document.activeElement;
        if(e.key == 'Backspace'){
            this.delete(element);
        }
    }

    arrowClick(e) {
        const element = document.activeElement.closest('li');
        
        if(e.key == 'ArrowUp') {
            this.focus(element, 'previous')
        }else if(e.key == 'ArrowDown'){
            this.focus(element, 'next');
        }
    }
}

export default ListKey;