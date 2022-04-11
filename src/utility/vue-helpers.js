import {
	isArray,
	isEmpty,
	isObject,
	isString,
	toArray,
} from '@morev/helpers';
import { EqualHeights } from '../equal-heights.js';

let equalHeights = null;

// Exported for test purpose only
export const normalizeVueValue = (value) => {
	if (!value) return [{ selector: '> *' }];
	if (isString(value)) return [{ selector: value }];
	if (isObject(value)) {
		return toArray(value.selector).filter(Boolean).reduce((acc, selector) => {
			acc.push({ selector, options: value.options || {} });
			return acc;
		}, []);
	}
	if (isArray(value)) {
		return [value.map(v => normalizeVueValue(v))]
			.flat(Infinity)
			.filter(v => !isEmpty(v));
	}

	return [];
};

export const mounted = (el, { value }) => {
	if (!equalHeights) equalHeights = new EqualHeights();
	normalizeVueValue(value).forEach(({ selector, options = {} }) => {
		equalHeights.add({ selector, options: { ...options, parent: el } }, false);
		// There is no guarantee that children are already mounted, so
		setTimeout(() => equalHeights.update());
	});
};

export const unmounted = (el, { value }) => {
	if (!equalHeights) equalHeights = new EqualHeights();
	normalizeVueValue(value).forEach(({ selector }) => {
		equalHeights.remove(selector, el);
	});
};
