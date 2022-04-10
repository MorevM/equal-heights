const { switchVueVersion, loadModule, MESSAGE_PREFIX } = require('./utils.cjs');

const Vue = loadModule('vue');

if (!Vue || typeof Vue.version !== 'string') {
	console.warn(`${MESSAGE_PREFIX} Vue is not found. Version for Vue 3 installed as default.`);
	switchVueVersion(3);
} else if (Vue.version.startsWith('2.')) {
	switchVueVersion(2);
} else if (Vue.version.startsWith('3.')) {
	switchVueVersion(3);
} else {
	console.warn(`${MESSAGE_PREFIX} Vue version v${Vue.version} is not suppported.`);
}
