import { normalizeVueValue } from '../../../src/utility/normalize-vue-value.js';

describe('normalize-vue-value', () => {
	it('Returns direct children selector for empty input', () => {
		expect(normalizeVueValue()).toStrictEqual([{ selector: '> *' }]);
		expect(normalizeVueValue(undefined)).toStrictEqual([{ selector: '> *' }]);
	});

	it('Normalizes value written as single string', () => {
		expect(normalizeVueValue('.selector')).toStrictEqual([{ selector: '.selector' }]);
	});

	it('Normalizes value written as array of strings', () => {
		expect(
			normalizeVueValue(['.selector', 'div']),
		).toStrictEqual([
			{ selector: '.selector' }, { selector: 'div' },
		]);
	});

	it('Normalizes value written as object (single selector)', () => {
		expect(
			normalizeVueValue({ selector: '.selector', options: { byRow: false } }),
		).toStrictEqual([
			{ selector: '.selector', options: { byRow: false } },
		]);
	});

	it('Normalizes value written as object (multiple selectors)', () => {
		expect(
			normalizeVueValue({ selector: ['.selector', '.another'], options: { byRow: false } }),
		).toStrictEqual([
			{ selector: '.selector', options: { byRow: false } },
			{ selector: '.another', options: { byRow: false } },
		]);
	});

	it('Normalizes value written as array of objects', () => {
		// eslint-disable-next-line unicorn/consistent-function-scoping
		const disabled = () => true;

		expect(
			normalizeVueValue([
				{ selector: '.selector', options: {} },
				{ selector: ['.another', '.third'], options: { byRow: false } },
				{ selector: ['.fourth'], options: { byRow: true } },
				{ selector: ['.fifth'], options: { disabled } },
			]),
		).toStrictEqual([
			{ selector: '.selector', options: {} },
			{ selector: '.another', options: { byRow: false } },
			{ selector: '.third', options: { byRow: false } },
			{ selector: '.fourth', options: { byRow: true } },
			{ selector: '.fifth', options: { disabled } },
		]);
	});
});
