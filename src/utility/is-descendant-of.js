/**
 * Checks whether a given element is a descendant of a given ancestor element.
 *
 * @param     {HTMLElement}   element    The element being evaluated.
 * @param     {HTMLElement}   ancestor   The ancestor element.
 *
 * @returns   {boolean}
 */
export const isDescendantOf = (element, ancestor) => {
	let el = element;

	while (!!el.parentElement) {
		el = el.parentElement;
		if (el === ancestor) return true;
	}

	return false;
};
