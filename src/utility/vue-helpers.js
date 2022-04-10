import { EqualHeights } from '../equal-heights.js';
import { normalizeVueValue } from './normalize-vue-value.js';

let equalHeights = null;

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
