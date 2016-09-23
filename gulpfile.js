var	gulp			= require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    tsify = require('tsify'),
    pretty = require('prettysize'),
    merge = require('lodash.merge'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    stream = require('stream'),
	gutil = require('gulp-util'),
	minifyCss 		= require('gulp-minify-css'),
	sass			= require('gulp-sass'),
	del				= require('del'),
    runSequence		= require('run-sequence'),
	gulpif			= require('gulp-if'),
	rename			= require("gulp-rename"),
	browserSync 	= require('browser-sync').create(),
	cordova 		= require('gulp-cordova'),
	isRelease		= false,
	startFirst		= true,
	reload 			= browserSync.reload,
	exec 			= require('child_process').exec,
	defaultSrc 		= [
	  'node_modules/es6-shim/es6-shim.min.js',
	  'node_modules/es6-shim/es6-shim.map',
	  'node_modules/zone.js/dist/zone.js',
	  'node_modules/reflect-metadata/Reflect.js',
	  'node_modules/reflect-metadata/Reflect.js.map'
	]
;



var defaultOptions = {
  watch: false,
  src: ['./app/app.ts', './typings/index.d.ts'],
  outputPath: 'www/js/',
  outputFile: 'app.bundle.js',
  minify: false,
  browserifyOptions: {
    cache: {},
    packageCache: {},
    debug: true
  },
  watchifyOptions: {},
  tsifyOptions: {},
  uglifyOptions: {},
  onError: function(err){
    console.error(err.toString());
    this.emit('end');
  },
  onLog: function(log){
    console.log((log = log.split(' '), log[0] = pretty(log[0]), log.join(' ')));
  }
}

buildBrowserify = function(options) {
  options = merge(defaultOptions, options);

  var b = browserify(options.src, options.browserifyOptions)
    .plugin(tsify, options.tsifyOptions);

  if (options.watch) {
    b = watchify(b, options.watchifyOptions);
    b.on('update', bundle);
    b.on('log', options.onLog);
  }

  return bundle();

  function bundle() {
    var debug = options.browserifyOptions.debug;
    return b.bundle()
      .on('error', options.onError)
      .pipe(source(options.outputFile))
      .pipe(buffer())
      .pipe(debug ? sourcemaps.init({ loadMaps: true }) : noop())
      .pipe(options.minify ? uglify(options.uglifyOptions) : noop())
      .pipe(debug ? sourcemaps.write('./',{includeContent:true, sourceRoot:'./'}) : noop())
      .pipe(gulp.dest(options.outputPath));
  }

  function noop(){
    return new stream.PassThrough({ objectMode: true });
  }
}




gulp.task('cordova', function() {
  gulp.src('./package.json')
    .pipe(cordova())
});

gulp.task('androidDevice', function() {
  gulp.src('./configs/androidDevice.json')
    .pipe(cordova())
});

gulp.task('androidBuild', function() {
  gulp.src('./configs/androidBuild.json')
    .pipe(cordova())
});


function CordovaAndroidBuild(){
	runSequence(
    'androidBuild',
    function (error) {

      if(typeof callback == "function")callback(error);

    });
}
function CordovaRunAndroidDevice(){
	runSequence(
    'androidDevice',
    function (error) {

      if(typeof callback == "function")callback(error);

    });
}
function CordovaRun(){
	runSequence(
    'cordova',
    function (error) {

      if(typeof callback == "function")callback(error);

    });
}
var reloadAll = function(){CordovaRun(); reload();};






gulp.task('build-js-defaultSrc', function(options) {
  options.src = options.src || defaultSrc;
  options.dest = options.dest || 'www/js';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest)).on('end', function(err){

		  if(startFirst==false){

			 reloadAll();

		  }
		  
	  });
});




gulp.task('build-js', function(options) {

  options.src = options.src || 'app/**/*.js';
  options.dest = options.dest || 'www';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest)).on('end', function(err){

		  if(startFirst==false){

			 reloadAll();

		  }

	  });
});




gulp.task('build', function(done){


      buildBrowserify({
        minify: gutil.env.type === 'production' ? true : false,
        browserifyOptions: {
          debug: gutil.env.type !== 'production' ? true : false
        },
        uglifyOptions: {
          mangle: false
        }
      }).on('end', function(err){

		  if(startFirst==false){

			 reloadAll();

		  }
		  done(err);
	  });

});


gulp.task('build-fonts', function(options) {
  options.src = options.src || 'app/**/*.+(ttf|eot|ijmap|svg|woff|woff2)';
  options.dest = options.dest || 'www';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest)).on('end', function(err){

		  if(startFirst==false){

			 reloadAll();

		  }

	  });
});



gulp.task('build-html', function(options) {
  options.src = options.src || 'app/**/*.html';
  options.dest = options.dest || 'www';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest)).on('end', function(err){

		  if(startFirst==false){

			 reloadAll();

		  }

	  });
});



gulp.task('copy-css', function(options) {
  options.src = options.src || 'app/**/*.css';
  options.dest = options.dest || 'www';

  return gulp.src(options.src)
	.pipe(gutil.env.type === 'production' ? minifyCss({compatibility: 'ie8'}) : gutil.noop())
    .pipe(gulp.dest(options.dest)).on('end', function(err){

		  if(startFirst==false){

			 reloadAll();

		  }

	  });
});




gulp.task('build-css', function(options) {
  options.src = options.src || './app/**/*.scss';
  options.dest = options.dest || 'www';
 return gulp.src(options.src)
   .pipe(sass({errLogToConsole: true}))
   .pipe( gutil.env.type === 'production' ? minifyCss({compatibility: 'ie8'}) : gutil.noop() )
   //.pipe(rename({extname: '.min.css'}))
   .pipe(gulp.dest(options.dest))
   .on('end', function() {
		  if(startFirst==false){

			 reloadAll();

		  }
   });
});



gulp.task('images', function(){
return gulp.src('app/images/**/*.*')
.pipe(gulp.dest('www/images'));
});



gulp.task('clean', function(){
  return del('www');
});



gulp.task('start', ['clean'], function(){runSequence(['webserver'])});


gulp.task('webserver',['build', 'build-js-defaultSrc', 'build-js', 'build-fonts','copy-css','build-css', 'build-html', 'images'], function(done){


	CordovaRun();


	if( gutil.env.type === 'androidDevice' ){
		CordovaRunAndroidDevice();

	}
	if( gutil.env.type === 'androidBuild' ){
		CordovaAndroidBuild();

	}

	if(!gutil.env.type ){

		browserSync.init({
			server: {
				baseDir: "./platforms/browser/www"
			}
		});


		startFirst=false;

		gulp.watch('app/**/*.scss', ['build-css']);
		gulp.watch("app/**/*.css", ['copy-css']);
		gulp.watch("app/**/*.+(ttf|eot|ijmap|svg|woff|woff2)", ['build-fonts']);
		gulp.watch("app/**/*.js", ['build-js']);
		gulp.watch("app/**/*.html", ['build-html']);
		gulp.watch("app/**/*.ts",['build']);



	}


});
