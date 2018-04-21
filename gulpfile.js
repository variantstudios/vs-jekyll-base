/**
 *  Require ALL the things...we need to build our site.
 */

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  compass = require('gulp-compass'),
  cleanCSS = require('gulp-clean-css'),
  prefix = require('gulp-autoprefixer'),
  cp = require('child_process'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  express = require('express'),
  fs = require('graceful-fs'),
  https = require('https'),
  gzip = require('gulp-gzip'),
  path = require('path');

// var messages = {
//   jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
// };

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  //browserSync.notify(messages.jekyllBuild);
  return cp.spawn('jekyll', ['build'], {
    stdio: 'inherit'
  }).on('close', done);
});


gulp.task('gzip-icons', function() {
  gulp.src('./assets/images/icons/*.svg')
    .pipe(gzip({ append: false }))
    .pipe(gulp.dest('./assets/images/icons/'));
});


/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

gulp.task('build', ['compass', 'scripts', 'minify-css', 'jekyll-build']);

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['build'], function () {
  browserSync({
    notify: {
      styles: [
        'display: none; ',
        'padding: 6px 15px 3px;',
        'position: fixed;',
        'font-size: 0.8em;',
        'z-index: 9999;',
        'left: 0px;',
        'bottom: 0px;',
        'color: rgb(74, 74, 74);',
        'background-color: rgb(17, 17, 17);',
        'color: rgb(229, 229, 229);'
      ]
    },
    server: {
      baseDir: '_site'
    }
  });
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('assets/sass/**', ['compass']);
  gulp.watch('assets/js/dev/**', ['scripts']);
  gulp.watch(
    [
      '**.md', '**.html', '_layouts/**.html', '_includes/**.html', '_includes/svg/**.html', '_data/**',
      'pages/**', 'assets/**.csv', 'assets/images/**', 'posts/**'
    ],
    ['jekyll-rebuild']
  );
});

// Compile Compass/SASS and Auto Prefix
gulp.task('compass', function () {
  gulp.src('assets/sass/**.scss')
    .pipe(plumber())
    .pipe(compass({
      css: 'assets/css',
      sass: 'assets/sass',
      image: 'assets/images',
      require: ['breakpoint', 'singularitygs', 'toolkit', 'breakpoint']
    }))
    //.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(prefix({
      browsers: ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(gulp.dest('assets/css'))
    .pipe(cleanCSS({debug: true, compatibility: 'ie8'}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('_site/assets/css'));
});

// Minify CSS, Clean and Other Things
gulp.task('minify-css', function () {
  return gulp.src('/assets/css/*.css')
    // .pipe(cleanCSS({debug: true}, (details) => {
    //   console.log(`${details.name}: ${details.stats.originalSize}`);
    //   console.log(`${details.name}: ${details.stats.minifiedSize}`);
    // }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist'));
    
});


// JS Script Tasks
gulp.task('scripts', function () {
  gulp.src('assets/js/dev/**.js')
    .pipe(plumber())
    .pipe(uglify())
    //.pipe(gzip())
    .pipe(gulp.dest('assets/js/prod/'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('_site/assets/js/prod/'));
});

gulp.task('serveHTTPS', function () {
  //Serves static files in _site with https
  //* This is required for some testing of
  //  https://localhost:9000/legal-and-security/terms-of-use/platform/
  //* Need ssl (https)
  //* Need Access-Control-Allow-Origin for port 9000 because this is port
  //  OptiUI-Dashboard's development server listens to when testing the
  //  app with optirtc.com dev server

  // https key/cert generated with these commands:
  // =============================================
  // openssl genrsa -out https-key.pem 2048
  // openssl req -new -sha256 -key https-key.pem -out https-csr.pem
  // openssl x509 -req -in https-csr.pem -signkey https-key.pem -out https-cert.pem
  var app = express();
  app.use(
    express.static(
      path.join(__dirname, '_site'),
      {
        setHeaders: res => {
          //* Server needs CORs exception for localhost:9000 when serving responses from localhost:9000
          //* Simililarly, cloudcannon needs to allow *.onopti.com when serving responses from optirtc.com
          res.set('Access-Control-Allow-Origin', 'https://localhost:9000');
        }
      }
    )
  );

  var options = {
    key: fs.readFileSync(path.join(__dirname, 'https-key.pem')).toString(),
    cert: fs.readFileSync(path.join(__dirname, 'https-cert.pem')).toString()
  };


  //Notes:
  //* public.optirtc.com expects localhost:9000 (which is required for testing
  //  https://localhost:9000/public-storage-remote-reality-example/
  //* However if we are using 9000 for OptiUI-Dashboard, then we need to serve on port 3000
  //* We don't have development approach for testing both OptiUI-Dashboard's dependency on platform terms
  //  and the public storage reality example at the same time.

  // https.createServer(options, app).listen(3000, function() {
  //   console.log('Server started on https://localhost:3000');
  // });
  https.createServer(options, app).listen(9000, function() {
    console.log('Server started on https://localhost:9000');
  });

});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

gulp.task('buildAndServeHTTPS', ['build', 'serveHTTPS' ]);
