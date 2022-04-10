import { EqualHeights } from './equal-heights.js';
import { normalizeVueValue } from './utility/normalize-vue-value.js';

let equalHeights = null;

const directive = {
	bind(el, { value }) {
		if (!equalHeights) equalHeights = new EqualHeights();
		normalizeVueValue(value).forEach(({ selector, options = {} }) => {
			equalHeights.add({ selector, options: { ...options, parent: el } });
		});
	},
	unbind(el, { value }) {
		if (!equalHeights) equalHeights = new EqualHeights();
		normalizeVueValue(value).forEach(({ selector }) => {
			equalHeights.remove(selector, el);
		});
	},
};

const install = (Vue) => {
	Vue.directive('equal-heights', directive);
};

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use({ install });
}

export default { install };
export { directive };
