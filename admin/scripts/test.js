const BuildUtils = require('that-build-library').BuildUtils

module.exports = Promise.resolve().then(() =>
	BuildUtils.exec('nyc', [
		'--reporter',
		'html',
		'--reporter',
		'text',
		'--reporter',
		'lcov',
		'--all',
		'true',
		'--check-coverage',
		'--lines',
		'1',
		'--per-file',
		'--report-dir',
		'./coverage',
		'--temp-directory',
		'./coverage/tmp',
		'--exclude',
		'src/**/*.spec.*',
		'--exclude',
		'src/**/index.js',
		'--include',
		'src/**/*',
		'node_modules/.bin/jasmine',
		'src/*.spec.js',
		'src/**/*.spec.js'
	])
)
