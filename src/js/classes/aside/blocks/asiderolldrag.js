import Block from '../../extends/block';
import { dragTask } from '../../../asset/bll';
import Main from '../../main/main';

class AsideRollDrag extends Block {
	constructor(selector, data) {
		super(selector);
		this.data = data;

		this._el.addEventListener('drop', this.dropTask.bind(this));
		this._el.addEventListener('dragover', this.dragTaskOverTab.bind(this));
		this._el.addEventListener('dragenter', this.dragPrevent.bind(this));
		this._el.addEventListener('dragleave', this.leaveDrag.bind(this));
	}

	dragPrevent(e) {
		e.preventDefault();
	}

	dragTaskOverTab(e) {
		this.dragPrevent(e);
		const tab = e.target.closest('.aside__list-item');

		if (!tab) return;
		tab.style.background = 'var(--tab-focus-bg)';
	}

	leaveDrag(e) {
		this.dragPrevent(e);
		const tab = e.target.closest('.aside__list-item');

		if (!tab) return;
		tab.style.background = '';
	}

	dropTask(e) {
		const tab = e.target.closest('.aside__list-item'),
			oldTaskObj = JSON.parse(e.dataTransfer.getData('text/plain')),
			newBllId = tab.getAttribute('data-counter');

		dragTask(oldTaskObj, newBllId);
		this.taskListRender();
	}

	taskListRender() {
		let element = this._el.querySelector('.opened');

		let index = element?.dataset.counter;
		new Main('.main', this.data, index).render();
	}

}

export default AsideRollDrag;