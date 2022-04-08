import { jest, describe, it, expect } from '@jest/globals';
import { getDocumentSize } from '../../../src/utility/get-document-size.js';

describe('getDocumentSize', () => {
	it('Returns the document scroll width if `axis` argument value is `x`', () => {
		// Arrange
		jest.spyOn(document.body, 'scrollWidth', 'get')
			.mockImplementation(() => 3000);

		// Act
		const result = getDocumentSize('x');

		// Assert
		expect(result).toBe(3000);
	});

	it('Returns the document scroll height if `axis` argument value is `y`', () => {
		// Arrange
		jest.spyOn(document.body, 'scrollHeight', 'get')
			.mockImplementation(() => 6000);

		// Act
		const result = getDocumentSize('y');

		// Assert
		expect(result).toBe(6000);
	});
});
