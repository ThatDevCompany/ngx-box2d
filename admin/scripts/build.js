const BuildUtils = require('that-build-library').BuildUtils

module.exports = Promise.resolve()
	.then(() => BuildUtils.clean('dist/'))

	.then(() => BuildUtils.echo('Transpiling'))
	.then(() => BuildUtils.exec('ngc', ['src/index']))

	.then(() => BuildUtils.echo('Inlining'))
	.then(() => BuildUtils.exec('ng-asset-inline', ['dist/ngxbox2d', 'src/ngxbox2d']))

	.then(() => BuildUtils.echo('Rolling Up'))
	.then(() =>
		BuildUtils.exec('rollup', ['-c', 'admin/scripts/build.rollup.config.js'])
	)

	.then(() => BuildUtils.echo('Uglifying'))
	.then(() =>
		BuildUtils.exec('uglifyjs', [
			'dist/bundles/ngxbox2d.umd.js',
			'--screw-ie8',
			'--compress',
			'--mangle',
			'--comments',
			'--output dist/bundles/ngxbox2d.umd.min.js'
		])
	)

	.then(() => BuildUtils.echo('Copying Files'))
	.then(() => BuildUtils.copy('README.md', 'dist'))
	.then(() => BuildUtils.copy('LICENSE', 'dist'))

	.catch(console.error)
