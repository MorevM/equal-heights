/// <reference types="Cypress" />

describe('EqualHeights', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.window().its('testModel').as('model');

		cy.get('@model').invoke('getInstance').as('equalHeights');
		cy.get('@equalHeights').invoke('reset');
	});

	after(() => {
		cy.get('@equalHeights').invoke('reset');
		cy.get('[name="equalHeights"]').uncheck();
		cy.get('[name="equalHeights"]').check();
		cy.get('[name="equalHeights"]').blur();
		cy.scrollTo(0, 0);
	});

	it('Sets equal height for registered elements', () => {
		cy.get('@equalHeights').invoke('add', [
			{ selector: '[data-elem="i1"]' },
			{ selector: '[data-elem="i2"]' },
			{ selector: '[data-elem="i3"]' },
			{ selector: '[data-elem="i4"]' },
			{ selector: '[data-elem="complicated-items"] [data-elem="header"]' },
			{ selector: '[data-elem="complicated-items"] [data-elem="title"]' },
		]);

		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 0, 4).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 4, 7).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="i2"]', 0, 4).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="i3"]', 0, 2).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="i4"]', 0, 2).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="i4"]', 2, 4).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="i4"]', 4, 6).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="complicated-items"] [data-elem="header"]', 0, 4).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="complicated-items"] [data-elem="header"]', 4, 6).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="complicated-items"] [data-elem="title"]', 0, 4).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="complicated-items"] [data-elem="title"]', 4, 6).should('to.be.true');
	});

	it('Sets equal height only for elements in the same row if `byRows` option value is `true`', () => {
		cy.get('@equalHeights').invoke('add', [{ selector: '[data-elem="i1"]', options: { byRows: true } }]);
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 0, 7).should('to.be.false');
	});

	it('Sets equal height for all registered elements if `byRows` option value is `false`', () => {
		cy.get('@equalHeights').invoke('add', [{ selector: '[data-elem="i1"]', options: { byRows: false } }]);
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 0, 7).should('to.be.true');
	});

	it('Observes resizing of the elements if `resizeObserver` option value is `true`', () => {
		cy.get('@equalHeights').invoke('add', [{ selector: '[data-elem="i1"]', options: { resizeObserver: true } }]);

		cy.get('[data-elem="add-paragraph"]').click();
		cy.get('[data-elem="add-paragraph"]').click();

		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 4, 7).should('to.be.true');
	});

	it('Observes adding/removing of the elements if `mutationObserver` option value is `true`', () => {
		cy.get('@equalHeights').invoke('add', [{ selector: '[data-elem="i1"]', options: { mutationObserver: true } }]);
		cy.get('[data-elem="add-item"]').click();

		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 4, 8).should('to.be.true');
	});

	it('Re-sets registered elements height after window resize', () => {
		cy.get('@equalHeights').invoke('add', [{ selector: '[data-elem="i1"]' }]);
		cy.viewport(375, 800);

		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 0, 4).should('to.be.false');
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 4, 7).should('to.be.false');
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 0, 2).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 2, 4).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 4, 6).should('to.be.true');
	});

	it('Considers the `isEnabled` option value', () => {
		cy.get('@equalHeights').invoke('add', [{
			selector: '[data-elem="i1"]',
			options: {
				isEnabled(window) {
					return window.innerWidth >= 1100;
				},
			},
		}]);

		cy.viewport(1024, 768);
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 0, 4).should('to.be.false');
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 4, 7).should('to.be.false');

		cy.viewport(1280, 720);
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 0, 4).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 4, 7).should('to.be.true');
	});

	it('Considers the `isDisabled` option value', () => {
		cy.get('@equalHeights').invoke('add', [{
			selector: '[data-elem="i1"]',
			options: {
				isDisabled(window) {
					return window.innerWidth < 1100;
				},
			},
		}]);

		cy.viewport(1024, 768);
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 0, 4).should('to.be.false');
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 4, 7).should('to.be.false');

		cy.viewport(1280, 720);
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 0, 4).should('to.be.true');
		cy.get('@model').invoke('compareHeight', '[data-elem="i1"]', 4, 7).should('to.be.true');
	});

	it('Preserves the initial inline `height` and `min-height` styles', () => {
		cy.get('@equalHeights').invoke('add', [{ selector: '[data-elem="i2"]' }]);
		cy.get('@equalHeights').invoke('reset');

		cy.get('@model').invoke('compareHeight', '[data-elem="i2"]', 0, 4).should('to.be.false');
	});
});
