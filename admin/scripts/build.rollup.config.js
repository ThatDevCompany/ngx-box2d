export default {
	input: 'dist/index.js',
	output: {
		file: 'dist/bundles/ngxbox2d.umd.js',
		format: 'umd',
		name: 'ngxbox2d',
		sourcemap: false,
		globals: {
			'@angular/core': 'ngxbox2d'
		}
	}
}
