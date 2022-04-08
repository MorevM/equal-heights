import { isString, isArray } from '@morev/helpers';
import { MoreMatchHeight as MatchHeight } from '@morev/equal-heights'; // eslint-disable-line import/no-unresolved

const matchHeight = new MatchHeight();
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
			matchHeight.add({ selector, options: { ...options, parent: el } });
		});
	},
	unbind(el, { value }) {
		normalizeValue(value).forEach(({ selector }) => {
			matchHeight.remove(selector, el);
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
export { directive as MoreMatchHeight };
