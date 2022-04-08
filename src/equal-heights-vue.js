import { isString, isArray } from '@morev/helpers';
import { EqualHeights } from '@morev/equal-heights'; // eslint-disable-line import/no-unresolved

const equalHeights = new EqualHeights();
const normalizeValue = (value) => (
	isString(value)
		? [{ selector: value }]
		: isArray(value) && !value.some((val) => !isString(val))
			? value.map((selector) => ({ selector }))
			: [value].flat()
);

const directive = {
	bind(el, { value }) {
		normalizeValue(value).forEach(({ selector, options = {} }) => {
			equalHeights.add({ selector, options: { ...options, parent: el } });
		});
	},
	unbind(el, { value }) {
		normalizeValue(value).forEach(({ selector }) => {
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
