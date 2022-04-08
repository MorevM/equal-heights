import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const ROOT_PATH = path.resolve('./').replace(/\\/g, '/');
const SRC_PATH = `${ROOT_PATH}/src`;
const DIST_PATH = `${ROOT_PATH}/dist`;

const esm = (entry) => ({
	input: `${SRC_PATH}/${entry}`,
	output: {
		file: `${DIST_PATH}/esm/${entry}`,
		format: 'esm',
		exports: 'named',
		sourcemap: true,
	},
	external: [
		'@morev/helpers',
		'@morev/equal-heights',
	],
	plugins: [
		resolve(),
		commonjs(),
		terser(),
	],
});

const cjs = (entry) => ({
	input: `${SRC_PATH}/${entry}`,
	output: {
		file: `${DIST_PATH}/cjs/${entry}`,
		format: 'cjs',
		exports: 'named',
		sourcemap: true,
	},
	external: [
		'@morev/helpers',
		'@morev/equal-heights',
	],
	plugins: [
		resolve(),
		commonjs(),
		terser(),
	],
});

const umd = (entry, name) => ({
	input: `${SRC_PATH}/${entry}`,
	output: {
		file: `${DIST_PATH}/umd/${entry}`,
		format: 'umd',
		name,
		sourcemap: false,
	},
	plugins: [
		resolve(),
		commonjs(),
		babel({
			babelHelpers: 'runtime',
			exclude: new RegExp('/node_modules/'),
			babelrc: false,
			presets: [['@babel/preset-env', { useBuiltIns: false }]],
			plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
		}),
		terser(),
	],
});

export default [
	esm('equal-heights.js'),
	esm('equal-heights-vue.js'),
	cjs('equal-heights.js'),
	cjs('equal-heights-vue.js'),
	umd('equal-heights.js', 'EqualHeights'),
	umd('equal-heights-vue.js', 'EqualHeights'),
];
