import Block from "../../extends/block";

class AsideSearch extends Block{
    constructor(selector, searchList) {
        super(selector);
        this.searchList = document.querySelector(searchList);

        this._el.addEventListener('input', this.search.bind(this));
        this._el.addEventListener('focusout', this.blur.bind(this));
    }

    blur(e) {
        let element = e.target;
        if(!element.classList.contains('aside__search-input')) return;

        element.value = '';
        this.search(e);
    }

    search(e) {
        let searchInput = e.target.value.toUpperCase().trim();
        const tabsInput = this.searchList.querySelectorAll('input');

        tabsInput.forEach(input => {

            if(!searchInput) {
                input.closest('li').classList.remove('searched');
                return;
            }
            
            if(input.value.toUpperCase().indexOf(searchInput) > -1) {
                input.closest('li').classList.add('searched');
            }else{
                input.closest('li').classList.remove('searched');
            }
        });

    }

}

export default AsideSearch;