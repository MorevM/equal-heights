declare namespace MoreMatchHeight {
	interface IOptions {
		byRows?: boolean;
		isEnabled?: (window: Window) => boolean;
		isDisabled?: (window: Window) => boolean;
		resizeObserver?: boolean;
		mutationObserver?: boolean;
		parent?: HTMLElement;
	}
	interface IInput {
		selector: string;
		options?: IOptions;
	}

}

declare class MoreMatchHeight {
	/**
	 * Default options.
	 */
	protected _defaults: Required<MoreMatchHeight.IOptions>;

	/**
	 * Working options.
	 */
	protected _options: Required<MoreMatchHeight.IOptions>;

	/**
	 * The stack of elements and options being processed.
	 */
	protected _stack: MoreMatchHeight.IInput[];

	/**
	 * ResizeObserver storage.
	 */
	protected _resizeObserver?: ResizeObserver;

	/**
	 * MutationObserver storage.
	 */
	protected _mutationObserver?: MutationObserver;

	/**
	 * Initializes the class instance.
	 */
	public constructor(options?: MoreMatchHeight.IOptions);

	/**
	 * Retrieves the array of elements by a given selector using a given common parent element.
	 *
	 * @param        selector   The elements selector.
	 * @param        parent     Common parent element.
	 *
	 * @returns                 The array of element descendants of a given parent that match a given selector.
	 */
	protected _getElements(selector: string, parent?: HTMLElement): HTMLElement[];

	/**
	 * Retrieves all the registered elements.
	 *
	 * @returns      The array of registered elements.
	 */
	protected _getAllElements(): HTMLElement[];

	/**
	 * Retrieves the groups of elements for which there should be set an equal height.
	 *
	 * @returns      The array of arrays of elements being processed.
	 */
	protected _getMatchElements(): HTMLElement[][];

	/**
	 * Registers a group(s) of elements and its options.
	 *
	 * @param      input   The input settings: elements selector, an array of elements selectors, an object structured of {selector: string, options?: object}, or an array of such objects.
	 */
	protected _registerElements(input: string | string[] | MoreMatchHeight.IInput | MoreMatchHeight.IInput[]): void;

	/**
	 * Initializes newly registered elements.
	 *
	 * @param      elements   The elements being initialized.
	 * @param      observe    Whether to observe the elements resizing using the `ResizeObserver`.
	 */
	protected _initElements(elements: HTMLElement[] | NodeList | HTMLCollection, observe?: boolean): void;

	/**
	 * Restores the initial state of all the registered elements.
	 */
	protected _resetElements(): void;

	/**
	 * Sets the equal height for the necessary elements.
	 */
	protected _setupElements(): void;

	/**
	 * Initializes events listeners.
	 */
	protected _attachEvents(): void;

	/**
	 * Initializes observers.
	 */
	protected _initObservers(): void;

	/**
	 * Updates the registered elements state.
	 */
	public update(): MoreMatchHeight;

	/**
	 * Adds a new group(s) of elements and (optionally) its specific options.
	 *
	 * @param      input   The input settings: elements selector, an object structured of {selector: string, options?: object}, or an array of such objects.
	 */
	public add(input: string | string[] | MoreMatchHeight.IInput | MoreMatchHeight.IInput[]): MoreMatchHeight;

	/**
	 * Removes the elements from the stack.
	 *
	 * @param      selector   Selector of the elements being de-registered.
	 * @param      parent     Common parent element.
	 */
	public remove(selector: string, parent?: HTMLElement): MoreMatchHeight;

	/**
	 * Restores the initial state of all the registered elements and removes it from the stack.
	 */
	public reset(): MoreMatchHeight;
}

export { MoreMatchHeight };
