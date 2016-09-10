var	gulp			= require('gulp'),
	minifyCss 		= require('gulp-minify-css'),
	sass			= require('gulp-sass'),
	del				= require('del'),
    runSequence		= require('run-sequence'),
	gulpif			= require('gulp-if'),
	rename			= require("gulp-rename"),
	uglify 			= require('gulp-uglifyjs'),
	browserSync 	= require('browser-sync').create(),
	cordova 		= require('gulp-cordova'),
	isRelease		= false,
	startFirst		= true,
	reload 			= browserSync.reload,
	exec 			= require('child_process').exec,
	buildBrowserify = require('ionic-gulp-browserify-typescript'),
	defaultSrc 		= [
	  'node_modules/es6-shim/es6-shim.min.js',
	  'node_modules/es6-shim/es6-shim.map',
	  'node_modules/zone.js/dist/zone.js',
	  'node_modules/reflect-metadata/Reflect.js',
	  'node_modules/reflect-metadata/Reflect.js.map'
	]
;



function CordovaRun(){
	runSequence(
    'cordova',
    function (error) {
      
      if(typeof callback == "function")callback(error);
	  
    });
}
var reloadAll = function(){CordovaRun(); reload();};

var gulpScriptAdapt= function(options) {
  options.src = options.src || defaultSrc;
  options.dest = options.dest || 'www/js';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest)).on('end', function(err){
		  
		  if(startFirst==false){
			  
			 reloadAll();
			 
		  }
		  
	  });
}
var gulpScriptAdapt3= function(options) {

  options.src = options.src || 'app/**/*.js';
  options.dest = options.dest || 'www';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest)).on('end', function(err){
		  
		  if(startFirst==false){
			  
			 reloadAll();
			 
		  }
		  
	  });
}


gulp.task('build2', function(done){
	

      buildBrowserify({
        minify: isRelease,
        browserifyOptions: {
          debug: !isRelease
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

gulp.task('build-js2', gulpScriptAdapt);
gulp.task('build-js3', gulpScriptAdapt3);


gulpfontsAdapt = function(options) {
  options.src = options.src || 'app/**/*.+(ttf|eot|ijmap|svg|woff|woff2)';
  options.dest = options.dest || 'www';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest)).on('end', function(err){
		  
		  if(startFirst==false){
			  
			 reloadAll();
			 
		  }
		  
	  });
}

gulp.task('build-fonts2', gulpfontsAdapt);


gulphtmlAdapt = function(options) {
  options.src = options.src || 'app/**/*.html';
  options.dest = options.dest || 'www';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest)).on('end', function(err){
		  
		  if(startFirst==false){
			  
			 reloadAll();
			 
		  }
		  
	  });
}


gulp.task('build-html2', function(options) {
  options.src = options.src || 'app/**/*.html';
  options.dest = options.dest || 'www';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest)).on('end', function(err){
		  
		  if(startFirst==false){
			  
			 reloadAll();
			 
		  }
		  
	  });
});

gulp.task('copy-css2', function(options) {
  options.src = options.src || 'app/**/*.css';
  options.dest = options.dest || 'www';

  return gulp.src(options.src)
	//.pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(options.dest)).on('end', function(err){
		  
		  if(startFirst==false){
			  
			 reloadAll();
			 
		  }
		  
	  });
});


gulp.task('cordova', function() {
  gulp.src('./package.json')
    .pipe(cordova())
})


gulpcssAdapt = function(options) {
  options.src = options.src || './app/**/*.scss';
  options.dest = options.dest || 'www';
 return gulp.src(options.src)
   .pipe(sass({errLogToConsole: true}))
   //.pipe(minifyCss({compatibility: 'ie8'}))
   //.pipe(rename({extname: '.min.css'}))
   .pipe(gulp.dest(options.dest))
   .on('end', function() {
     
   });
};
gulp.task('build-css2', gulpcssAdapt);



gulp.task('images', function(){
return gulp.src('app/images/**/*.*')
.pipe(gulp.dest('www/images'));
});



gulp.task('clean', function(){
  return del('www');
});



gulp.task('start', ['clean'], function(){runSequence(['webserver'])});


gulp.task('webserver',['build2', 'build-js2', 'build-js3', 'build-fonts2','copy-css2','build-css2', 'build-html2', 'images'], function(done){

	
	CordovaRun();
	
	
	browserSync.init({
        server: {
            baseDir: "./platforms/browser/www"
        }
    });
	
	
	startFirst=false;
	
	gulp.watch('app/**/*.scss', ['build-css2']);
	gulp.watch("app/**/*.css", ['copy-css2']);
	gulp.watch("app/**/*.+(ttf|eot|ijmap|svg|woff|woff2)", ['build-fonts2']);
	gulp.watch("app/**/*.js", ['build-js3']);
	gulp.watch("app/**/*.html", ['build-html2']);
	gulp.watch("app/**/*.ts",['build2']);
	

	
});

    

