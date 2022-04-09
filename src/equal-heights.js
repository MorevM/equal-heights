import {
	defaults,
	noop,
	isString,
	isArray,
	isEmpty,
	isNode,
	getElementOffset,
	getWindowScroll,
	debounce,
} from '@morev/helpers';
import { getScrollLimit } from './utility/get-scroll-limit.js';

const DEFAULTS = {
	byRows: true,
	isEnabled: () => true,
	isDisabled: () => false,
	resizeObserver: true,
	mutationObserver: true,
	parent: document.body,
};

class MoreMatchHeight {
	/**
	 * Working options.
	 *
	 * @protected
	 */
	_options = {};

	/**
	 * The stack of elements and options being processed.
	 *
	 * @protected
	 */
	_stack = [];

	/**
	 * ResizeObserver storage.
	 *
	 * @protected
	 */
	_resizeObserver;

	/**
	 * MutationObserver storage.
	 *
	 * @protected
	 */
	_mutationObserver;

	/**
	 * Initializes the class instance.
	 *
	 * @param   {object}        [options]                    Custom options, extends the defaults.
	 * @param   {boolean}       [options.byRows]             Whether only the elements in the same row should have equal height, instead of all the elements in stack.
	 * @param   {Function}      [options.isEnabled]          A function to test whether the elements should have the equal height. Accepts the `window` object as the argument.
	 *                                                       Returns a value that coerces to `true` to set equal height, or to `false` otherwise.
	 * @param   {Function}      [options.isDisabled]         A function to test whether the elements should not have the equal height. Accepts the `window` object as the argument.
	 *                                                       Returns a value that coerces to `true` to unset equal height, or to `false` otherwise.
	 * @param   {boolean}       [options.resizeObserver]     Whether to observe resizing of the elements using the `ResizeObserver`.
	 * @param   {boolean}       [options.mutationObserver]   Whether to observe adding/removing of the elements using the `MutationObserver`.
	 * @param   {HTMLElement}   [options.parent]             Common parent element of a given elements.
	 */
	constructor(options = {}) {
		this._options = defaults(DEFAULTS, options);

		this._initObservers();
		this._attachEvents();
	}

	/**
	 * Retrieves the array of elements by a given selector using a given common parent element.
	 *
	 * @param     {string}                  selector   The elements selector.
	 * @param     {HTMLElement|undefined}   [parent]   Common parent element.
	 *
	 * @returns   {HTMLElement[]}                      The array of element descendants of a given parent that match a given selector.
	 *
	 * @protected
	 */
	_getElements(selector, parent) {
		return [...(parent ?? this._options.parent).querySelectorAll(selector)];
	}

	/**
	 * Retrieves all the registered elements.
	 *
	 * @returns   {HTMLElement[]}   The array of registered elements.
	 *
	 * @protected
	 */
	_getAllElements() {
		return this._stack.reduce((acc, { selector, options }) => [
			...acc,
			...this._getElements(selector, options.parent),
		], []);
	}

	/**
	 * Retrieves the groups of elements for which there should be set an equal height.
	 *
	 * @returns   {HTMLElement[][]}   The array of arrays of elements being processed.
	 *
	 * @protected
	 */
	_getMatchElements() {
		this._getAllElements().forEach((el) => {
			el.style.setProperty('height', '50px');
		});

		const matchElements = this._stack.map(({ selector, options }) => {
			const { isEnabled, isDisabled } = options;
			const { byRows, parent } = options;

			if (!isEnabled(window) || isDisabled(window)) {
				return [];
			}

			return Object.values(this._getElements(selector, parent).reduce((acc, el) => {
				const offset = byRows ? getElementOffset(el, 'y') : -1;

				acc[offset] ??= [];
				acc[offset].push(el);

				return acc;
			}, {}));
		});

		this._resetElements();

		return matchElements.flat();
	}

	/**
	 * Registers a group(s) of elements and its options.
	 *
	 * @param     {string|string[]|object|object[]}   input   The input settings: elements selector, an array of elements selectors,
	 *                                                        an object structured of {selector: string, options?: object}, or an array of such objects.
	 *
	 * @returns   {void}
	 *
	 * @protected
	 */
	_registerElements(input) {
		/* eslint-disable padded-blocks */
		if (isString(input)) {

			const selector = input;
			const options = this._options;

			this._stack.push({ selector, options });
			this._initElements(this._getElements(selector, options.parent), options.resizeObserver);

		} else if (isArray(input) && !input.some((val) => !isString(val))) {

			const selectors = input;
			const options = this._options;

			selectors.forEach((selector) => {
				this._stack.push({ selector, options });
				this._initElements(this._getElements(selector, options.parent), options.resizeObserver);
			});

		} else {

			[input].flat().forEach((group) => {
				const { selector, options: customOptions = {} } = group;
				const options = defaults(this._options, customOptions);

				this._stack.push({ selector, options });
				this._initElements(this._getElements(selector, options.parent), options.resizeObserver);
			});

		}
		/* eslint-enable padded-blocks */
	}

	/**
	 * Initializes newly registered elements.
	 *
	 * @param     {HTMLElement[]|NodeList|HTMLCollection}   elements    The elements being initialized.
	 * @param     {boolean}                                 [observe]   Whether to observe the elements resizing using the `ResizeObserver`.
	 *
	 * @returns   {void}
	 *
	 * @protected
	 */
	_initElements(elements, observe = false) {
		elements.forEach((el) => {
			const height = el.style.getPropertyValue('height');
			const minHeight = el.style.getPropertyValue('min-height');

			if (!!height) el.dataset.ehHeight = height;
			if (!!minHeight) el.dataset.ehMinHeight = minHeight;

			if (observe) this._resizeObserver.observe(el);
		});
	}

	/**
	 * Restores the initial state of all the registered elements.
	 *
	 * @returns   {void}
	 *
	 * @protected
	 */
	_resetElements() {
		this._getAllElements().forEach((el) => {
			el.style.removeProperty('min-height');
			el.style.removeProperty('height');

			if ('ehHeight' in el.dataset) el.style.setProperty('height', el.dataset.ehHeight);
			if ('ehMinHeight' in el.dataset) el.style.setProperty('min-height', el.dataset.ehMinHeight);
		});
	}

	/**
	 * Sets the equal height for the necessary elements.
	 *
	 * @returns   {void}
	 *
	 * @protected
	 */
	_setupElements() {
		const { left: scrollX, top: scrollY } = getWindowScroll();
		this._resetElements();

		this._getMatchElements().forEach((elements) => {
			const maxHeight = elements.reduce((acc, el) => (
				Math.max(acc, el.offsetHeight)
			), 0);
			elements.forEach((el) => {
				el.style.setProperty('min-height', `${maxHeight}px`);
			});
		});

		window.scrollTo({
			left: Math.min(scrollX, getScrollLimit('x')),
			top: Math.min(scrollY, getScrollLimit('y')),
			behavior: 'auto',
		});
	}

	/**
	 * Initializes events listeners.
	 *
	 * @returns   {void}
	 *
	 * @protected
	 */
	_attachEvents() {
		window.addEventListener('load', () => this.update());
		window.addEventListener('orientationchange', () => this.update());
		window.addEventListener('resize', debounce(() => this.update()));
	}

	/**
	 * Initializes observers.
	 *
	 * @returns   {void}
	 *
	 * @protected
	 */
	_initObservers() {
		this._resizeObserver = 'ResizeObserver' in window
			? new ResizeObserver(debounce(() => this.update(), 60))
			: { observe: noop, unobserve: noop, disconnect: noop };

		this._mutationObserver = 'MutationObserver' in window
			? new MutationObserver((mutations) => {
				const queries = Object.entries(this._stack.reduce((acc, { selector, options }) => {
					if (options.mutationObserver) {
						acc[selector] ??= [];
						acc[selector].push(options.parent);
					}
					return acc;
				}, {}));

				if (isEmpty(queries)) return;

				const checkNode = (node) => (
					isNode(node) && queries.some(([selector, parents]) => (
						node.matches(selector) && parents.some((parent) => (
							parent === this._options.parent || parent.contains(node)
						))
					))
				);

				const needUpdate = [...mutations].some((mutation) => (
					[...mutation.addedNodes].some((node) => checkNode(node))
					|| [...mutation.removedNodes].some((node) => checkNode(node))
				));

				needUpdate && this.update();
			})
			: { observe: noop, disconnect: noop };

		this._mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	/**
	 * Updates the registered elements state.
	 *
	 * @returns   {EqualHeights}
	 */
	update() {
		this._setupElements();
		return this;
	}

	/**
	 * Adds a new group(s) of elements and (optionally) its specific options.
	 *
	 * @param     {string|string[]|object|object[]}   input   The input settings: elements selector, an array of elements selectors,
	 *                                                        an object structured of {selector: string, options?: object}, or an array of such objects.
	 *
	 * @returns   {EqualHeights}
	 */
	add(input) {
		this._registerElements(input);
		this.update();

		return this;
	}

	/**
	 * Removes the elements from the stack.
	 *
	 * @param     {string}                  selector   Selector of the elements being de-registered.
	 * @param     {HTMLElement|undefined}   [parent]   Common parent element.
	 *
	 * @returns   {EqualHeights}
	 */
	remove(selector, parent) {
		this._resetElements();
		this._stack = this._stack.filter(({ selector: _selector, options }) => {
			if (_selector === selector && options.parent === (parent ?? this._options.parent)) {
				if (options.resizeObserver) {
					this._getElements(_selector, options.parent).forEach((el) => {
						this._resizeObserver.unobserve(el);
					});
				}

				return false;
			}

			return true;
		});

		this.update();

		return this;
	}

	/**
	 * Restores the initial state of all the registered elements and removes it from the stack.
	 *
	 * @returns   {EqualHeights}
	 */
	reset() {
		this._resetElements();

		this._stack = [];
		this._resizeObserver.disconnect();

		return this;
	}
}

export { EqualHeights };
