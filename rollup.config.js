import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

function getFileNames() {
	const src = path.resolve('src');
	try {
		if (!fs.existsSync(src)) {
			chalk.red('模块不存在');
			return;
		}

		const packages = [];
		const files = fs.readdirSync(src);

		if (files.length < 1) {
			chalk.red('目录为空');
			return [];
		}

		files.forEach((file) => {
			console.error(file);
			if (!fs.statSync(path.join(src, file)).isDirectory()) {
				packages.push(file);
			}
		});

		return packages;
	} catch (e) {
		chalk.red(e);
		return [];
	}
}

export default getFileNames().map((file) => {
	return Object.assign(
		{
			input: `src/${file}`
		},
		{
			output: {
				dir: 'dist',
				format: 'cjs',
				sourcemap: true
			},
			plugins: [
				uglify(),
				resolve(),
				babel({
					exclude: 'node_modules/**' // 只编译我们的源代码
				})
			]
		}
	);
});
