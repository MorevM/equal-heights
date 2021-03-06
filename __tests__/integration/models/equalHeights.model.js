/* eslint-disable unicorn/filename-case */
import { EqualHeights } from '../../../src/equal-heights.js';

class EqualHeightsModel {
	/**
	 * The working `EqualHeights` instance.
	 *
	 * @protected
	 */
	_instance = null;

	/**
	 * Initializes the class instance
	 *
	 * @param   {EqualHeights}   [instance]   Initialized `EqualHeights` instance.
	 */
	constructor(instance) {
		this._instance = instance ?? new EqualHeights();
	}

	/**
	 * Returns the working `EqualHeights` instance.
	 *
	 * @returns   {EqualHeights}
	 */
	getInstance() {
		return this._instance;
	}

	/**
	 * Compares heights of the elements matches a given selector.
	 * The elements stack can be sliced by using the `start` and `end` arguments.
	 *
	 * @param     {string}             selector   Selector of the elements being compared.
	 * @param     {number}             [start]    Zero-based index at which to start extraction.
	 * @param     {number|undefined}   [end]      Zero-based index before which to end extraction.
	 *
	 * @returns   {boolean}
	 */
	compareHeight(selector, start = 0, end = undefined) {
		const elements = document.querySelectorAll(selector);
		const compare = [...elements].slice(start, end);

		if (!compare.length) {
			return false;
		}

		const first = compare.shift();
		const hasDifference = compare.some((element) => element.offsetHeight !== first.offsetHeight);

		return !hasDifference;
	}
}

export { EqualHeightsModel };
