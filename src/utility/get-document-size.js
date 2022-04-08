/**
 * Retrieves the document scroll size (width or height).
 *
 * @param     {string}   [axis]   Whether to return the document scroll width (x) or height (y).
 *
 * @returns   {number}            The document scroll size.
 */
export const getDocumentSize = (axis = 'y') => {
	const scrollWidth = [
		document.body.scrollWidth, document.documentElement.scrollWidth,
		document.body.offsetWidth, document.documentElement.offsetWidth,
		document.body.clientWidth, document.documentElement.clientWidth,
	];

	const scrollHeight = [
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight,
	];

	return Math.max(...(axis === 'x' ? scrollWidth : scrollHeight));
};
