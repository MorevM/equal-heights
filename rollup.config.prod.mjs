import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const ROOT_PATH = path.resolve('./').replace(/\\/g, '/');
const SRC_PATH = `${ROOT_PATH}/src`;
const DIST_PATH = `${ROOT_PATH}/dist`;

const mappings = [
	{ format: 'esm', extension: 'mjs' },
	{ format: 'cjs', extension: 'cjs' },
];

const processFiles = (...files) => files.reduce((acc, entry) => {
	mappings.forEach(({ format, extension }) => {
		acc.push({
			input: `${SRC_PATH}/${entry}.js`,
			output: {
				file: `${DIST_PATH}/${entry}.${extension}`,
				format,
				exports: 'named',
				sourcemap: true,
			},
			external: ['@morev/utils'],
			plugins: [
				resolve(),
				commonjs(),
			],
		});
	});
	return acc;
}, []).flat();

export default processFiles('equal-heights', 'vue2', 'vue3');
