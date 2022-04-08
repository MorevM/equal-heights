import { jest, describe, it, expect } from '@jest/globals';
import { getScrollLimit } from '../../../src/utility/get-scroll-limit.js';

describe('getScrollLimit', () => {
	const windowSize = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	beforeAll(() => {
		window.innerWidth = 1920;
		window.innerHeight = 1080;
		window.dispatchEvent(new Event('resize'));
	});

	afterAll(() => {
		window.innerWidth = windowSize.width;
		window.innerHeight = windowSize.height;
		window.dispatchEvent(new Event('resize'));
	});

	it('Returns the maximum scroll value by x-axis if `axis` argument value is `x`', () => {
		// Arrange
		jest.spyOn(document.body, 'scrollWidth', 'get')
			.mockImplementation(() => 3000);

		// Act
		const result = getScrollLimit('x');

		// Assert
		expect(result).toBe(3000 - 1920);
	});

	it('Returns the maximum scroll value by y-axis if `axis` argument value is `y`', () => {
		// Arrange
		jest.spyOn(document.body, 'scrollHeight', 'get')
			.mockImplementation(() => 6000);

		// Act
		const result = getScrollLimit('y');

		// Assert
		expect(result).toBe(6000 - 1080);
	});

	it('Returns `0` if document scroll size is less than window size (typically because of scrollbar)', () => {
		// Arrange
		jest.spyOn(document.body, 'scrollWidth', 'get')
			.mockImplementation(() => 1903);

		jest.spyOn(document.body, 'scrollHeight', 'get')
			.mockImplementation(() => 1063);

		// Act
		const resultX = getScrollLimit('x');
		const resultY = getScrollLimit('y');

		// Assert
		expect(resultX).toBe(0);
		expect(resultY).toBe(0);
	});
});
