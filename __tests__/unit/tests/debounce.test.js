/* eslint-disable no-autofix/sonarjs/no-identical-functions */
import { describe, it, expect } from '@jest/globals';
import { debounce } from '../../../src/utility/debounce.js';

describe('debounce', () => {
	it('Delays a given function invoking until a given `delay` time have elapsed since the last time a function was invoked', async () => {
		// Arrange
		let counter = 0;
		const debounced = debounce(() => counter++, 32, false);

		// Act
		const result = async () => new Promise((resolve) => {
			debounced();
			setTimeout(debounced, 16);
			setTimeout(debounced, 32);
			setTimeout(debounced, 128);
			setTimeout(() => resolve(counter), 256);
		});

		// Assert
		await expect(result()).resolves.toBe(2);
	});

	it('Invokes a given function once immediately after initialization', async () => {
		// Arrange
		let counter = 0;
		const debounced = debounce(() => counter++, 32, true);

		// Act
		const result = async () => new Promise((resolve) => {
			debounced();
			setTimeout(debounced, 16);
			setTimeout(debounced, 32);
			setTimeout(debounced, 128);
			setTimeout(() => resolve(counter), 256);
		});

		// Assert
		await expect(result()).resolves.toBe(4);
	});

	it('Preserves the original context and arguments', async () => {
		// Arrange
		let counter = 0;
		const debounced = debounce(function (one, two) { counter += (this + one + two); }, 32, false).bind(100, 10, 1);

		// Act
		const result = async () => new Promise((resolve) => {
			debounced();
			setTimeout(debounced, 16);
			setTimeout(debounced, 32);
			setTimeout(debounced, 128);
			setTimeout(() => resolve(counter), 256);
		});

		// Assert
		await expect(result()).resolves.toBe(222);
	});
});
