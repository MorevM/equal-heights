import { mounted, unmounted } from './utility/vue-helpers.js';

const directive = { mounted, unmounted };

const plugin = {
	install: (Vue) => Vue.directive('equal-heights', directive),
};

export { plugin, directive };
