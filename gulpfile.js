/* global require */

const gulp = require('gulp')

const babel    = require('gulp-babel')
const connect  = require('gulp-connect')
const del      = require('del')
const eslint   = require('gulp-eslint')
const mustache = require('gulp-mustache')
const rename   = require('gulp-rename')
const sass     = require('gulp-sass')

const mustacheOptions = { tags: ['%{{', '}}%'] }

////////////////////////////////////////////////////////////////////////////////
// RESET
////////////////////////////////////////////////////////////////////////////////

gulp.task('reset', () => {
	del.sync(['./dist/'])
})


////////////////////////////////////////////////////////////////////////////////
// HTML
////////////////////////////////////////////////////////////////////////////////

gulp.task('build:html', () => {
	del(['./dist/**/*.html', './dist/images/*'])
		.then(() => {
			return Promise.all([
				new Promise((resolve) => {
					gulp.src(['./src/**/*.htm', './src/**/*.html'])
						.pipe(mustache({}, mustacheOptions))
						.pipe(rename((path) => {
							path.extname = '.html'
						}))
						.pipe(gulp.dest('./dist/'))
						.on('end', resolve)
				}),
				new Promise((resolve) => {
					gulp.src(['./src/images/*'])
						.pipe(gulp.dest('./dist/'))
						.on('end', resolve)
				})
			])
		})
		.then(() => {
			gulp.src(['./dist/**/*.html', './dist/images/*'])
				.pipe(connect.reload())
		})
})

gulp.task('watch:html', ['build:html'], () => {
	gulp.watch(['./src/**/*.htm', './src/**/*.html'], ['build:html'])
})


////////////////////////////////////////////////////////////////////////////////
// JAVASCRIPT
////////////////////////////////////////////////////////////////////////////////

gulp.task('build:js', () => {
	del(['./dist/**/*.js', './dist/**/*.map'])
		.then(() => {
			return Promise.all([
				new Promise((resolve) => {
					gulp.src(['./src/**/*.js'])
						.pipe(mustache({}, mustacheOptions))
						.pipe(eslint())
						.pipe(eslint.format())
						.pipe(babel())
						.pipe(gulp.dest('./dist/'))
						.on('end', resolve)
				}),
				new Promise((resolve) => {
					gulp.src([
						'./node_modules/babel-polyfill/dist/polyfill.min.js',
						'./node_modules/backbone/backbone-min.js',
						'./node_modules/backbone/backbone-min.map',
						'./node_modules/jquery/dist/jquery.min.js',
						'./node_modules/mustache/mustache.min.js',
						'./node_modules/underscore/underscore-min.js',
						'./node_modules/underscore/underscore-min.map'
					]).pipe(gulp.dest('./dist/scripts/'))
						.on('end', resolve)
				})
			])
		})
		.then(() => {
			gulp.src(['./dist/**/*.js'])
				.pipe(connect.reload())
		})
})

gulp.task('watch:js', ['build:js'], () => {
	gulp.watch(['./src/**/*.js', './src/**/*.mustache'], ['build:js'])
})


////////////////////////////////////////////////////////////////////////////////
// STYLESHEET
////////////////////////////////////////////////////////////////////////////////

gulp.task('build:css', () => {
	del(['./dist/**/*.css'])
		.then(() => {
			return Promise.all([
				new Promise((resolve) => {
					gulp.src(['./src/**/*.css'])
						.pipe(mustache({}, mustacheOptions))
						.pipe(sass())
						.pipe(gulp.dest('./dist/'))
						.on('end', resolve)
				}),
				new Promise((resolve) => {
					gulp.src(['./src/**/*.scss'])
						.pipe(mustache())
						.pipe(gulp.dest('./dist/'))
						.on('end', resolve)
				})
			])
		})
		.then(() => {
			gulp.src(['./dist/**/*.css'])
				.pipe(connect.reload())
		})
})

gulp.task('watch:css', ['build:css'], () => {
	gulp.watch(['./src/**/*.css', './src/**/*.scss'], ['build:css'])
})


////////////////////////////////////////////////////////////////////////////////
// GROUP
////////////////////////////////////////////////////////////////////////////////

gulp.task('build', ['build:html', 'build:js', 'build:css'])

gulp.task('watch', ['watch:html', 'watch:js', 'watch:css'])


////////////////////////////////////////////////////////////////////////////////
// DEFAULT
////////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['watch'], () => {
	connect.server({
		root: './dist/',
		livereload: true
	});
})
