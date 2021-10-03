import Aside from "./aside/aside";
import Block from "./extends/block";
import { mainTemplate } from "../utils/template";

class App extends Block{
    constructor(selector, data) {
        super(selector);
        this.data = data;
        
        this.init();
    }

    render() {
        new Aside('.aside', this.data).render();
    }

    init() {
        this._el.insertAdjacentHTML('beforeend', this.template);
    }

    get template() {
        return mainTemplate();
    }
}

export default App;