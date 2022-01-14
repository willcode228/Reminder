import { addTask } from '../../../asset/bll';
import ListKey from '../../extends/listkey';
import InfoModal from './infomodal';

class MainRollKey extends ListKey {
	constructor(selector, data, index, mainDataUpdate, deleteTaskUpdate) {
		super(selector);
		this.data = data;
		this.bllIndex = index;
		this.update = mainDataUpdate;
		this.delete = deleteTaskUpdate;

		this._el.addEventListener('keydown', this.throttle(this.keyDelete.bind(this), 200));
		this._el.addEventListener('keydown', this.throttle(this.keyCompleted, 300));
		this._el.addEventListener('keydown', this.renameFocus.bind(this));
		this._el.addEventListener('keydown', this.enter.bind(this));
	}

	keyCompleted(e) {
		if (e.keyCode == 32) {
			if (!e.target.classList.contains('task')) return;
			e.target.querySelector('input').click();
		}
	}

	renameFocus(e) {
		const element = document.activeElement;

		if (e.key === 'Tab') {
			e.preventDefault();
			if (!element.classList.contains('main__list-task')) return;
			let taskText = element.querySelector('p');
			taskText.contentEditable = true;
			taskText.focus();
		}
	}

	enter(e) {
		const element = document.activeElement;
		if (e.key === 'Enter') {
			//! prevent add "\n (Enter key)" to the task text after fast focusing on element
			e.preventDefault();
			if (!element.classList.contains('task-text')) return;

			if (element.textContent.trim()) {
				addTask(this.bllIndex);
				this.update();
			} else {
				element.blur();
			}
		}
	}
}

export default MainRollKey;