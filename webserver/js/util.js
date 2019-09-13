export const pushUnique(array, item) => {
	const index = array.indexOf(item);
	if (index === -1) {
		array.push(item);
		return true;
	}
	return false;
};
export const arrayRemove(array, item) => {
	const index = array.indexOf(item);
	if (index !== -1) {
		array.splice(index, 1);
		return true;
	}
	return false;
};