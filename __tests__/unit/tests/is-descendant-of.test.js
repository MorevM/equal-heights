import { describe, it, expect } from '@jest/globals';
import { isDescendantOf } from '../../../src/utility/is-descendant-of.js';

describe('isDescendantOf', () => {
	beforeAll(() => {
		document.body.insertAdjacentHTML('beforeend', `
			<div class="test-blocks">
				<div class="test-block1">
					<div class="test-block2">
						<div class="test-block3"></div>
					</div>
				</div>
				<div class="test-block4"></div>
			</div>
		`);
	});

	afterAll(() => {
		const el = document.querySelector('.test-blocks');
		el.remove();
	});

	it('Returns `true` if a given element is a children of a given ancestor element', () => {
		const parent = document.querySelector('.test-block2');
		const child = document.querySelector('.test-block3');

		expect(isDescendantOf(child, parent)).toBe(true);
	});

	it('Returns `true` if a given element is a descendant of a given ancestor element', () => {
		const ancestor = document.querySelector('.test-block1');
		const descendant = document.querySelector('.test-block3');

		expect(isDescendantOf(descendant, ancestor)).toBe(true);
	});

	it('Returns `false` if a given element is not a descendant of a given ancestor element', () => {
		const block1 = document.querySelector('.test-block1');
		const block4 = document.querySelector('.test-block4');

		expect(isDescendantOf(block4, block1)).toBe(false);
	});
});
