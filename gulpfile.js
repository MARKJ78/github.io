var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var surge = require('gulp-surge')
var htmlmin = require('gulp-htmlmin');
var minifyInline = require('gulp-minify-inline');
var critical = require('critical');

// Development Tasks ----------------- Start browserSync server
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
})

gulp.task('sass', function () {
    return gulp
        .src('app/scss/**/*.scss')
        .
        // Gets all files ending with .scss in app/scss and children dirs
        pipe(sass().on('error', sass.logError))
        .
        // Passes it through a gulp-sass, log errors to console
        pipe(gulp.dest('app/css'))
        .
        // Outputs it in the css folder
        pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
})

// Watchers
gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})

// Optimization Tasks ------------------ Optimizing CSS, html & JavaScript
gulp.task('useref', function () {
    return gulp
        .src('app/*.html')
        .pipe(useref())
        .
        //
        // pipe(gulpIf('*.html', minifyInline())). // pipe(gulpIf('*.html',
        // htmlmin({collapseWhitespace: true}))). //
        pipe(gulpIf('*.js', uglify()))
        .
        //
        pipe(gulpIf('*.css', cssnano()))
        .
        //
        pipe(gulpIf('*.css', autoprefixer({browsers: ['last 3 versions'], cascade: false})))
        .
        //
        pipe(gulp.dest('dist'));

});

// Optimizing Images
gulp.task('images', function () {
    return gulp
        .src('app/images/*.+(png|jpg|jpeg|gif|svg)')
        .
        //
        // Caching images that ran through imagemin
        pipe(cache(imagemin({interlaced: true})))
        .
        //
        pipe(gulp.dest('dist/images'))
});
/*gulp.task('minify', function() {
    return gulp.src('app/*.html').pipe(htmlmin({collapseWhitespace: true})).pipe(gulp.dest('dist'));
});*/

// Copying fonts
gulp.task('fonts', function () {
    return gulp
        .src('app/fonts/**/*')
        .
        //
        pipe(gulp.dest('dist/fonts/'))
})

// Cleaning
gulp.task('clean', function () {
    return del
        .sync('dist')
        .then(function (cb) {
            return cache.clearAll(cb);
        });
})

gulp.task('clean:dist', function () {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences ---------------

gulp.task('default', function (callback) {
    runSequence([
        'sass', 'browserSync'
    ], 'watch', callback)
})
//main page inject css
gulp.task('critical', function (callback) {
    critical.generate({
        base: 'dist/', src: 'index.html', css: ['dist/css/styles.css'],
        //ignore: ['@font-face'],
        extract: true,
        inline: true,
        minify: false,
        dimensions: [
            {
                width: 320,
                height: 480
            }, {
                width: 768,
                height: 1024
            }, {
                width: 1280,
                height: 960
            }, {
                width: 1920,
                height: 1080
            }
        ],
        dest: 'index.html'
    }, callback);
});

//minify inline js/css
gulp.task('minifyInline', function () {
    gulp
        .src('dist/*.html')
        .pipe(minifyInline())
        .
        //
        pipe(htmlmin({collapseWhitespace: true}))
        .
        //
        pipe(gulp.dest('dist/')); //
    //

});

gulp.task('build', function (callback) {
    runSequence('clean:dist', 'sass', [
        'useref', 'images', 'fonts'
    ], 'critical', 'minifyInline', 'deploy', callback)
})
gulp.task('deploy', [], function () {
    return surge({project: './dist', domain: 'mark-jones.surge.sh'})
})
