export const taskInfo = element => {
	const elementIndex = element.attributes[0].value,
		elementType = element.attributes[0].name.replace(/data-/g, ''),
		reverseElementType = elementType === 'uncompleted' ? 'completed' : 'uncompleted';

	return [elementIndex, elementType, reverseElementType];
};
