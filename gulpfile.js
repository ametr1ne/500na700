const { src, dest, parallel, series, watch } = require('gulp')
const imagemin = require('gulp-imagemin')
const imgCompress  = require('imagemin-jpeg-recompress')
const del = require('del')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const gcssmq = require('gulp-group-css-media-queries')
const includeFiles = require('gulp-include')
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create()

function browsersync() {
    browserSync.init({
      server: {
        baseDir: './public/',
        serveStaticOptions: {
          extensions: ['html'],
        },
      },
      port: 3000,
      ui: { port: 3001 },
      open: true,
    })
  }

  function styles() {
    return src('./src/styles/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ grid: true }))
    .pipe(gcssmq())
    .pipe(dest('./public/css/'))
    .pipe(browserSync.stream())
  }

  function scripts() {
    return src('./src/js/script.js')
    .pipe(
      includeFiles({
        includePaths: './src/components/**/',
      })
    )
    .pipe(uglify())
		.pipe(concat('script.min.js'))
    .pipe(dest('./public/js/'))
    .pipe(browserSync.stream())
  }

  function pages() {
    return src('./src/pages/*.html')
    .pipe(
      includeFiles({
        includePaths: './src/components/**/',
      })
    )
    .pipe(dest('./public/'))
    .pipe(browserSync.reload({ stream: true, }))
  }

  async function copyFonts() {
    return src('./src/fonts/**/*')
    .pipe(dest('./public/fonts/'))
  }

  async function copyImages() {
    return src('./src/images/**/*')
    .pipe(dest('./public/images/'))
  }

  async function compressImages() {
      return src('./src/images/**/*')
      .pipe(imagemin([
        imgCompress({
          loops: 4,
          min: 70,
          max: 80,
          quality: 'high'
        }),
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo()
      ]))
      .pipe(dest('./public/images/'));
  }

  async function clean() {
    return del.sync('./public/', { force: true })
  }

  function watch_dev() {
    watch(['./src/js/script.js', './src/components/**/*.js'], scripts)
    watch(['./src/styles/style.scss', './src/components/**/*.scss'], styles).on(
      'change',
      browserSync.reload
    )
    watch(['./src/pages/*.html', './src/components/**/*.html'], pages).on(
      'change',
      browserSync.reload
    )
  }

exports.browsersync = browsersync
exports.clean = clean
exports.scripts = scripts
exports.styles = styles
exports.pages = pages
exports.copyFonts = copyFonts
exports.compressImages = compressImages
exports.copyImages = copyImages

exports.default = parallel(
  clean,
  styles,
  scripts,
  copyFonts,
  copyImages,
  pages,
  browsersync,
  watch_dev
)

exports.build = series(
  clean,
  styles,
  scripts,
  copyFonts,
  compressImages,
  pages
)