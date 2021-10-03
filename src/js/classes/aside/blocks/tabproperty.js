import { changeAccentColor } from "../../../asset/bll";
import { tabPropertyTemplate } from "../../../utils/template";

class TabProperty {
    constructor(selector, accentColor, title, index, callback) {
        this.selector = selector;
        this.accentColor = accentColor;
        this.title = title;
        this.bllIndex = index;
        this.update = callback;
    }
    
    init() {
        document.body.insertAdjacentHTML('beforeend', this.template);

        this._el = document.querySelector(this.selector);
        this._el.parentElement.classList.add('active');
        this._circle = this._el.querySelector('.property__circle');

        this._circle.style.background = `var(--${this.accentColor})`;

        this._el.addEventListener('click', this.action.bind(this));
        this._el.addEventListener('input', this.colorChoose.bind(this));
    }

    rename() {
        this.renameText = this._el.querySelector('.property__input').value;
        this.update(this.renameText, this.accentColor);
    }

    action(e) {
        const element = e.target;

        if(element.classList.contains('property__quit')) {
            this._el.parentNode.classList.remove('active');

            setTimeout(() => {
                this._el.parentNode.remove();
            }, 300);
        }

        if(element.classList.contains('property__resolve')) {

            this.rename();
            this.colorUpdate();

            this._el.parentNode.classList.remove('active');

            setTimeout(() => {
                this._el.parentNode.remove();
            }, 300);
        }

        if(element.closest('.property__img')) {
            let colorForm = element.closest('.property__img').querySelector('.property__checkboxes');
            colorForm.classList.toggle('active');
        }
    }

    colorUpdate() {
        changeAccentColor(this.bllIndex, this.accentColor);
        this.update(this.renameText, this.accentColor);
    }

    colorChoose(e) {
        let element = e.target;
        if(!element.classList.contains('color-input')) return;

        let colorValue = element.value;
        this._circle.style.background = `var(--${colorValue})`;

        this.accentColor = colorValue;
    }   

    get template() {
        return tabPropertyTemplate(this.title, this.accentColor);
    }
}

export default TabProperty;