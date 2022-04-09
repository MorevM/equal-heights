import { EqualHeights } from '@morev/equal-heights'; // eslint-disable-line import/no-unresolved
import { normalizeVueValue } from './utility/normalize-vue-value.js';

const equalHeights = new EqualHeights();

const directive = {
	bind(el, { value }) {
		normalizeVueValue(value).forEach(({ selector, options = {} }) => {
			equalHeights.add({ selector, options: { ...options, parent: el } });
		});
	},
	unbind(el, { value }) {
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
export { directive as EqualHeights };
