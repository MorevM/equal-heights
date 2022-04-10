/* eslint-disable no-console */
const { switchVueVersion, MESSAGE_PREFIX } = require('./utils.cjs');

const version = process.argv[2];
const vueEntry = process.argv[3] || 'vue';

if (version === '2') {
	switchVueVersion(2, vueEntry);
	console.log(`${MESSAGE_PREFIX} Switched to Vue 2`);
} else if (version === '3') {
	switchVueVersion(3, vueEntry);
	console.log(`${MESSAGE_PREFIX} Switched to Vue 3`);
} else {
	console.warn(`${MESSAGE_PREFIX} expecting version "2" or "3" but got "${version}"`);
}
