import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [
	{
		input: 'src/js/models/Search.js',
		output: {
			name: 'autoComplete',
			file: pkg.browser,
			format: 'umd',
			sourceMap: 'inline'
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
		input: 'src/js/models/Search.js',
		output: [
			{ file: pkg.main, format: 'cjs', sourceMap: 'inline' },
			{ file: pkg.module, format: 'es', sourceMap: 'inline' }
		],
		plugins: [
			babel({
				exclude: 'node_modules/**',
				presets: ['@babel/preset-env'],
			})
		]
	}
];