const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sassGlob = require('gulp-sass-glob');

// Задача для компіляції SCSS у CSS
gulp.task('styles', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sassGlob()) // Підтримка імпорту через glob
    .pipe(sass().on('error', sass.logError)) // Компіляція SCSS
    .pipe(autoprefixer({
      cascade: false
    })) // Додавання вендорних префіксів
    .pipe(cssnano()) // Мінімізація CSS
    .pipe(gulp.dest('dist/css')) // Записуємо результат у папку dist
    .pipe(browserSync.stream()); // Автоматичне оновлення сторінки
});

// Задача для автоматичного оновлення сторінки
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('styles')); // Слідкуємо за змінами в SCSS
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload); // Слідкуємо за змінами в JS
  gulp.watch('src/*.html').on('change', browserSync.reload); // Слідкуємо за змінами в HTML
});

// Основна задача для запуску
gulp.task('default', gulp.series('styles', 'serve'));
