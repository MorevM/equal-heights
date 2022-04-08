import { getDocumentSize } from './get-document-size.js';

/**
 * Retrieves the maximum scroll value.
 *
 * @param     {string}   [axis]   Scroll axis (x|y).
 *
 * @returns   {number}            The maximum scroll value by a given axis.
 */
export const getScrollLimit = (axis = 'y') => (
	Math.max(0, getDocumentSize(axis) - (axis === 'x' ? window.innerWidth : window.innerHeight))
);
