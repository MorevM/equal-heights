import { randomInteger } from '@morev/helpers';
import { EqualHeights } from '../../../src/equal-heights.js';
import { EqualHeightsModel } from '../../../__tests__/integration/models/equalHeights.model.js';

// EqualHeights
const equalHeights = new EqualHeights();

const updateOptions = () => {
	equalHeights.reset();

	if (!document.querySelector('[name="equalHeights"]').checked) {
		return;
	}

	const options = ['byRows', 'resizeObserver', 'mutationObserver'].reduce((acc, name) => {
		acc[name] = document.querySelector(`[name="${name}"]`).checked;
		return acc;
	}, {});

	equalHeights.add([
		{ selector: '[data-elem="i1"]', options },
		{ selector: '[data-elem="i2"]', options },
		{ selector: '[data-elem="i3"]', options },
		{ selector: '[data-elem="i4"]', options },
		{ selector: '[data-elem="header"]', options: { ...options, parent: document.querySelector('[data-elem="complicated-items"]') } },
		{ selector: '[data-elem="title"]', options: { ...options, parent: document.querySelector('[data-elem="complicated-items"]') } },
	]);
};

updateOptions();

document.addEventListener('change', ({ target }) => {
	['equalHeights', 'byRows', 'resizeObserver', 'mutationObserver'].some((name) => {
		if (target.closest(`[name="${name}"]`)) {
			updateOptions();
			return true;
		}

		return false;
	});
});

// Add content
document.querySelector('[data-elem="add-paragraph"]').addEventListener('click', function (e) {
	this.insertAdjacentHTML('beforebegin', `<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>`);
	e.preventDefault();
});

document.querySelector('[data-elem="add-item"]').addEventListener('click', function (e) {
	const items = [...this.parentElement.parentElement.children].slice(0, -1);
	const item = items[0].cloneNode();

	item.style.removeProperty('height');
	item.style.removeProperty('min-height');
	item.innerHTML = `<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>`.repeat(randomInteger(1, 4));

	this.parentElement.insertAdjacentElement('beforebegin', item);
	e.preventDefault();
});

// Test mode
if ('Cypress' in window) {
	window.testModel = new EqualHeightsModel(equalHeights);
}
