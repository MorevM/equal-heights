import { mounted, unmounted } from './utility/vue-helpers.js';

const directive = {
	bind: (...args) => mounted(...args),
	unbind: (...args) => unmounted(...args),
};

const plugin = {
	install: (Vue) => Vue.directive('equal-heights', directive),
};

export { plugin, directive };
