import Block from "../../extends/block";

class AsideOpen extends Block{
    constructor(selector, aside){
        super(selector);
        this.aside = aside;

        this._el.addEventListener('click', this.open.bind(this));
    }

    open() {
        this._el.classList.toggle('active');
        this.aside.classList.toggle('active');
    }
}
export default AsideOpen;

//aside open logic on phones