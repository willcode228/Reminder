import AsideRollView from './blocks/asiderollview';
import AsideRollRep from './blocks/asiderollrep';
import AsideRollKey from './blocks/asiderollkey';
import AsideSearch from './blocks/asidesearch';
import AsideOpen from './blocks/asideopen';
import AsideAdd from './blocks/asideadd';
import Block from '../extends/block';
import AsideRollDrag from './blocks/asiderolldrag';

class Aside extends Block {
	constructor(selector, data) {
		super(selector);
		this.data = data;
	}

	render() {

		const delUpdate = (element) => {
			asideEvent.delete(element);
		};

		let asideEvent = new AsideRollRep('.aside__list-list', this.data);

		new AsideRollDrag('.aside__list-list', this.data);

		new AsideRollKey('.aside__list-list', delUpdate);

		new AsideRollView('.aside__list-list').render(this.data);

		new AsideSearch('.search', '.aside__list-list');

		new AsideAdd('.aside__add');

		new AsideOpen('.aside-open', this._el);
	}
}

export default Aside;



