const { src, dest, task, series, watch, parallel} = require("gulp");
const rm = require('gulp-rm');

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');

const concat = require('gulp-concat');

//const px2rem = require('gulp-smile-px2rem');
const cleanCSS = require('gulp-clean-css');

const sourcemaps = require('gulp-sourcemaps');

const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;

task('clean', () => {
return src('dist/**/*', { read: false })
    .pipe(rm())
})

task('copy:html', () => {
    return src('src/css/*.html').pipe(dest('dist'));
})

task('copy:svg', () => {
    return src('src/sprite.svg').pipe(dest('dist'));
})

task('copy:video', () => {
    return src('src/*.mp4').pipe(dest('dist'));
})

const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/css/main.scss'
];

task('styles', () => {
    return src(styles)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('dist'));
});

task('stylesSrc', () => {
    return src(styles)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('src'));
});


task('scripts', () => {
    return src('src/js/**/*')
    .pipe(dest('dist/js'));
});

task('img', () => {
    return src('src/img/**/*.*')
    .pipe(dest('dist/img'));
});

watch('./src/styles/**/*.scss', series('styles'));
task('default', series('clean', parallel('copy:html','img','copy:svg','copy:video', 'styles', 'stylesSrc','scripts') )); 