"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const concat = require('gulp-concat');
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const sourcemaps = require('gulp-sourcemaps');
// Load package.json for banner
//const pkg = require('./package.json');


// CSS task
function css() {
  return gulp
    .src("assets/scss/app.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
   
    
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: ['_'],
    }))
    .on("error", sass.logError)

    .pipe(autoprefixer({
      cascade: false
    }))
    
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest("./assets/public/css"))
}

/*export webfonts to public folder*/ 
function webfonts() {
  return gulp
    .src(["assets/fonts/*.{ttf,woff,woff2,eot,svg}","assets/scss/vendor/fontawesome/webfonts/*.{ttf,woff,woff2,eot,svg}"])
    .pipe(gulp.dest('./assets/public/css/webfonts'));
}

// Clean vendor
function clean() {
  return del(["./assets/public"]);
}

// JS task
function js() {
  return gulp
    .src([
      './assets/js/jquery.min.js',
      './assets/js/popper.min.js',
      './assets/js/bootstrap.min.js',            
      './assets/js/owl.carousel.js',      
      './assets/js/owl.autoplay.js',      
      './assets/js/owl.navigation.js',                  
      './assets/js/utils.js',                  
      './assets/js/designer.js',            
    ])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('app-bundle.js'))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('./assets/public/js'))
}



// Watch files
function watchFiles() {
  gulp.watch("./assets/scss/**/*", css);
  gulp.watch(["./assets/js/**/*", "!./assets/js/**/*.min.js"], js);
  gulp.watch("./**/*.html");
}
const vendor = gulp.series(clean);
const build = gulp.series(vendor, gulp.parallel(css, js, webfonts));
const watch = gulp.series(build, gulp.parallel(watchFiles));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
exports.webfonts = webfonts;
