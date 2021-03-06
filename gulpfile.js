'use strict';

var gulp           = require('gulp'),                   // This is Gulp in project
    sass           = require('gulp-sass'),              // Scss compilator
    sourcemaps     = require('gulp-sourcemaps'),        // Scss sourcemaps for browser
    browserSync    = require('browser-sync').create(),  // browser sync
    imagemin       = require('gulp-imagemin'),          // for minifiy images
    watch          = require('gulp-watch'),             // this is gulp watch for binding new files
    autoprefixer   = require('gulp-autoprefixer'),      // adds vendor prefixes in css
    gulpFilter     = require('gulp-filter'),            // file filtration
    flatten        = require('gulp-flatten'),           // remove folders structure
    requirejsOptimize = require('gulp-requirejs-optimize'),          // uglify js
    mainBowerFiles = require('gulp-main-bower-files'),  // get main bower files
    twig            = require('gulp-twig'),
    data            = require('gulp-data'),
    path            = require('path'),
    fs              = require('fs'),
    JSON5           = require('json5'),
    _               = require('lodash');

gulp.task('browser-sync', function() {  // Task for Browser sync
    browserSync.init({                  // initialization
        server: {                       // create server on port 3000
            baseDir: "./public"               // path to index.html
        }
    });
    gulp.watch('./frontend/stylesheets/**/*.scss', ['sass']);           // sass watching
    gulp.watch('./views/**/*.twig', ['twig']);
    gulp.watch('./fixtures/**/*.json', ['twig']);
    gulp.watch("./public/*.html").on('change', browserSync.reload);            // html watching and reload browser
    gulp.watch("./public/**/*.js").on('change', browserSync.reload);    // js watching and reload browser
});

gulp.task('sass', function () {                         // Task for compile sass to css
    return gulp.src('./frontend/stylesheets/**/*.scss') // path to your scss
        .pipe(sourcemaps.init())                        // init sourcemaps
        .pipe(sass().on('error', sass.logError))        // for compile scss, write errors in command prompt and to not exit gulp task
        .pipe(autoprefixer({                            // adds vendor prefixes
            browsers: ['last 15 versions']
        }))
        .pipe(sourcemaps.write())                       // write sourcemaps in browser
        .pipe(gulp.dest('./public/css'))               // destination for compile files
        .pipe(browserSync.stream());                     // reload browser
});

gulp.task('image:watch', ['image:build'], function(){   // Task for watching new and deleted images, task image:build runs before this task is running
    return watch([                                      // path to files to watch
        './frontend/images/**/*.jpg',
        './frontend/images/**/*.png',
        './frontend/images/**/*.svg',
        './frontend/images/**/*.gif'], function () {
        gulp.src([                                      // path to files to build
                './frontend/images/**/*.jpg',
                './frontend/images/**/*.png',
                './frontend/images/**/*.svg',
                './frontend/images/**/*.gif'
            ])
            .pipe(imagemin())                           // minimize images
            .pipe(gulp.dest('./public/images'));        // destination for optimized images
    });
});

gulp.task('image:build', function(){                    // Task to relocate images from frontend folder to public folder
    gulp.src([                                          // path to files to build
            './frontend/images/**/*.jpg',
            './frontend/images/**/*.png',
            './frontend/images/**/*.svg',
            './frontend/images/**/*.gif'
        ])
        .pipe(imagemin())                               // minimize images
        .pipe(gulp.dest('./public/images'));            // destination for optimized images
});

gulp.task('javascripts:watch', ['javascripts:build'], function(){   // Task for watching new and deleted scripts, task javascripts:build runs before this task is running
    return watch('./frontend/javascripts/**/*.js', function () {    // Path to watching files
        gulp.src('./frontend/javascripts/**/*.js')                  // Path to bulild files
            // .pipe(uglify())                                         // Uglify and minimize scripts
            .pipe(gulp.dest('./public/js'));                        // destination for optimized scripts
    });
});

gulp.task('javascripts:build', function(){              // Task to relocate scripts from frontend folder to public folder
    gulp.src('./frontend/javascripts/**/*.js')          // Path to scripts
        // .pipe(uglify())                                 // Uglify and minimize scripts
        .pipe(gulp.dest('./public/js'));                // destination for optimized scripts
});

gulp.task('js:optimize', function () {
    return gulp.src('./public/js/index.js')
        .pipe(requirejsOptimize())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('main-bower-files', function() {                      // Task to put bower downloaded files from bower components
    var filterJS = gulpFilter('**/*.js', { restore: true });    // Filter to put only js files
    return gulp.src('./bower.json')                             // In this file task watch what packages you want to get in dependencies or devDependencies
        .pipe(mainBowerFiles( ))                                // Puts files from bower components
        .pipe(filterJS)                                         // Filter only js files
        .pipe(flatten())                                        // Remove directories
        .pipe(gulp.dest('./public/js'));                        // Destination where to put main bower files
});

var getJsonData = function(file) {
    var fileName = path.basename(file.path, '.twig');
    var fixturesForFile = JSON5.parse(fs.readFileSync('./fixtures/' + fileName + '.json'));
    var general = JSON5.parse(fs.readFileSync('./fixtures/_.json'));
    var result = _.extend(general, fixturesForFile);
    return result;
};

gulp.task('twig', function() {

    var twig = require('gulp-twig');
    return gulp.src('./views/pages/*.twig')
        .pipe(data(getJsonData))
        .pipe(twig())
        .pipe(gulp.dest('./public'));

});

gulp.task('default', [      // This is default task. You car run it wrining 'gulp' in command prompt
    'browser-sync',         //
    'sass',                 //
    'twig',
    'image:watch',          //  Tasks after runnung default task
    'main-bower-files',     //
    'javascripts:watch'     //
]);