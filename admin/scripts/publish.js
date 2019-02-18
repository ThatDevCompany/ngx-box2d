const BuildUtils = require('that-build-library').BuildUtils

module.exports = Promise.resolve()
	.then(() => require('./lint'))
	.then(() => require('./build'))
	.then(() => BuildUtils.echo('PUBLISHING'))
	.then(() =>
		BuildUtils.publish('dist', pkg => {
			delete pkg.scripts
			pkg.main = 'bundles/ngxbox2d.umd.js'
			pkg.module = 'index.js'
			pkg.typings = 'index.d.ts'
		})
	)
