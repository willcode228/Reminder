import Block from '../../extends/block';
import { isDarkTheme } from '../../../utils/isDarkTheme';
import { taskInfo } from '../../../utils/taskInfo';

class MainRollDrag extends Block{
	constructor(selector, bllIndex, update) {
		super(selector);
		this.bllIndex = bllIndex;
		this.update = update;

		this._el.addEventListener('dragstart', this.dragTaskStart.bind(this));
		this._el.addEventListener('dragend', this.dragTaskEnd.bind(this));
	}

	dragTaskStart(e) {
		let element = e.target;
		if (!element.classList.contains('main__list-task')) return;

		this.dragStartImg(e);
		let [taskId, taskType] = taskInfo(element);

		const oldTaskInfo = { taskId, taskType, oldBllIndex: this.bllIndex};
		e.dataTransfer.setData("text/plain", JSON.stringify(oldTaskInfo));
		this.update();
	}

	dragTaskEnd(e) {
		let element = e.target;
		if (!element.classList.contains('main__list-task')) return;
		this.update();
	}

	dragStartImg(e) {
		let img = new Image();
		img.src = isDarkTheme() ? 'dragFrameDark.f18f19dc.svg' : 'dragFrameLight.cf894adc.svg';
		e.dataTransfer.setDragImage(img, 18, 13);
	}
}

export default  MainRollDrag;