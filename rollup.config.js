import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [
	{
		input: 'src/js/models/autoComplete.js',
		output: {
			file: pkg.browser,
			name: 'autoComplete',
			format: 'umd'
		},
		plugins: [
			eslint({
				exclude: [
					'src/css/**'
				]
			}),
			babel({
				exclude: 'node_modules/**',
				presets: ['@babel/preset-env'],
			}),
			uglify({
				compress: {
					toplevel: true
				}
			})
		]
	},
	{
		input: 'src/js/models/autoComplete.js',
		output: {
			file: pkg.main,
			name: 'autoComplete',
			format: 'umd'
		},
		plugins: [
			babel({
				exclude: 'node_modules/**',
				presets: ['@babel/preset-env'],
			})
		]
	}
];