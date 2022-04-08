import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssDiscardComments from 'postcss-discard-comments';
import postcssDiscardDuplicates from 'postcss-discard-duplicates';

const IS_DEV = process.env.NODE_ENV === 'development';
// const IS_TEST = process.env.NODE_ENV === 'test';

const ROOT_PATH = path.resolve('./').replace(/\\/g, '/');
const PLAYGROUND_PATH = `${ROOT_PATH}/playground`;

export default [

	// main.js
	{
		input: `${PLAYGROUND_PATH}/assets/scripts/main.js`,
		output: {
			file: `${PLAYGROUND_PATH}/build/main.js`,
			format: 'iife',
			exports: 'none',
			sourcemap: true,
		},
		plugins: [
			resolve(),
			commonjs(),
			babel({
				babelHelpers: 'runtime',
				exclude: new RegExp('/node_modules/'),
				babelrc: false,
				presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
				plugins: [['@babel/plugin-transform-runtime']],
			}),
			serve({
				open: false,
				contentBase: `${PLAYGROUND_PATH}`,
				host: 'localhost',
				port: 3001,
			}),
			IS_DEV && livereload({
				watch: `${PLAYGROUND_PATH}`,
			}),
		],
	},

	// main.scss
	{
		input: `${PLAYGROUND_PATH}/assets/styles/main.scss`,
		output: {
			file: `${PLAYGROUND_PATH}/build/main.css.tmp`,
			format: 'esm',
			exports: 'none',
		},
		plugins: [
			scss({
				output: `${PLAYGROUND_PATH}/build/main.css`,
				sourceMap: true,
				processor: () => postcss([
					postcssPresetEnv({ stage: 1 }),
					postcssDiscardComments(),
					postcssDiscardDuplicates(),
				]),
				watch: IS_DEV ? `${PLAYGROUND_PATH}/assets/styles/` : null,
			}),
		],
		onwarn(warning, warn) {
			if (['EMPTY_BUNDLE'].includes(warning.code)) return;
			warn(warning);
		},
	},

];
