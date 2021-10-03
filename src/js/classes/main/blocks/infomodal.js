import { infoModalTemplate } from "../../../utils/template";

class InfoModal {
    constructor(text) {
        this.text = text;
    }

    init() {
        document.body.insertAdjacentHTML('afterend', this.template);
        this._el = document.querySelector('.infoModal');

        setTimeout(() => {
            this._el.classList.remove('active');
        }, 500);

        setTimeout(() => {
            this._el.remove();
        }, 800);
    }

    get template() {
        return infoModalTemplate(this.text);
    }
}

export default InfoModal;