import {
	isArray, isEmpty, isObject, isString, toArray,
} from '@morev/helpers';

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
