import { dellTabPrompt } from "../../../utils/template";

class DelTabPrompt{
    constructor(selector, data, index, callback) {
        this.selector = selector;
        this.data = data;
        this.bllIndex = index;
        this.update = callback;
    }
    
    init() {
        if(!Object.keys(this.data.template.uncompleted).length){
            this.update();
            return;
        };

        document.body.insertAdjacentHTML('beforeend', this.template);

        this._el = document.querySelector(this.selector);
        this._el.parentElement.classList.add('active');
        this._el.addEventListener('click', this.prompt.bind(this));
    }

    prompt(e) {
        const element = e.target;

        if (element.classList.contains('prompt__delete')){
            this.update();
        } 
        
        if(element.classList.contains('prompt__quit')
        || element.classList.contains('prompt__delete')){

            this._el.parentNode.classList.remove('active');
    
            setTimeout(() => {
                this._el.parentNode.remove();
            }, 300);
        }
            
    }
    
    get template() {
        return dellTabPrompt(this.data.listTitle);
    }

}

export default DelTabPrompt;