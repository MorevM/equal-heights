const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname);
const dist = path.join(dir, '..', 'dist');

const loadModule = (name) => {
	try {
		// eslint-disable-next-line import/no-dynamic-require
		return require(name);
	} catch {
		return undefined;
	}
};

const copy = (name) => {
	const src = path.join(dist, name);
	const dest = path.join(dist, name.replace(/\d/, ''));
	const content = fs.readFileSync(src, 'utf8');
	// unlink for pnpm, @see https://github.com/vueuse/vue-demi/issues/92
	try {
		fs.unlinkSync(dest);
	} catch {}
	fs.writeFileSync(dest, content, 'utf8');
};

const switchVueVersion = (version) => {
	copy(`vue${version}.cjs`);
	copy(`vue${version}.mjs`);
};

module.exports.loadModule = loadModule;
module.exports.switchVueVersion = switchVueVersion;
module.exports.MESSAGE_PREFIX = '[@morev/equal-heights]';
