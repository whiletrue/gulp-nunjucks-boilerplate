const gulp           = require('gulp');
const browserSync    = require('browser-sync');
const cssmin         = require('gulp-cssmin');
const sass           = require('gulp-sass');
const nunjucksRender = require('gulp-nunjucks-render');
const newer          = require('gulp-newer');
const sourcemaps     = require('gulp-sourcemaps');
const concat         = require('gulp-concat');
const util           = require('gulp-util');
const data           = require('gulp-data');
const del            = require('del');
const reload         = browserSync.reload;
const sync           = browserSync.create();


const src = {
  scss : 'src/scss/**/*.scss',
  css  : 'src/css/',
  js   : 'src/js/**/*.js',
  njk  : 'src/**/*.njk',
  img  : 'src/images/**/*.+(png|jpg|jpeg|gif|webp)',
  dist  : 'dist/'
};

const templates = () => {
  return gulp.src('src/pages/**/*.+(html|njk|nunjucks)')
    .pipe(data(() => {
      return require('./data.json');
    }))
    .pipe(nunjucksRender({
      path: ['src/templates/']
    }))
    .pipe(gulp.dest(src.dist))
    .pipe(reload({stream: true }));
}

const styles = () => {
	return gulp.src(src.scss)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({outputStyle: 'compressed'}))
      .on('error',util.log)
    .pipe(sourcemaps.write(`.`))
    .pipe(gulp.dest(`${src.dist}/css/`))
    .pipe(sync.stream())
}

const scripts = () => {
  return gulp.src(src.js)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write(`.`))
    .pipe(gulp.dest(`${src.dist}/js/`))
    .pipe(sync.stream())
}

const images = () => {
	return gulp.src(src.img)
    .pipe(gulp.dest(`${src.dist}/images`))
    .pipe(sync.stream());
}

const serve = () => {
  sync.init({
    server: { 
      baseDir: "./dist" 
    }
  });
  
  gulp.watch(`${src.dist}/js/**/*.js`, sync.reload);
  gulp.watch(`${src.dist}/css/**/*.css`, sync.reload);
	gulp.watch(`${src.dist}/images/**/*.(png|jpg|jpeg|gif|webp)`, sync.reload);
	gulp.watch(`${src.dist}/**/*.+(html)`, sync.reload);
}

const watch = () => {
	gulp.watch(src.njk, templates);
  gulp.watch(src.js, scripts);
  gulp.watch(src.scss, styles);
  gulp.watch(src.img, images);
}

const clean = () => {
  return del([
		src.dist
	]);
}

gulp.task('build', gulp.series(clean, gulp.parallel(templates, scripts, styles, images)));

// Add production tasks with bundling, minimizing etc.
//gulp.task('production', '');

gulp.task('watch', gulp.series('build', gulp.parallel(serve, watch)))

