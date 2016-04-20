var gulp = require('gulp');
var sass =require('gulp-sass');
var autoprefixer = require ('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var beep = require('beepbeep');
var colors = require('colors');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var ghPages = require('gh-pages');

//mensaje de error


var onError = function(err) {
  beep([200, 200]);
  console.log(
    '\n\n****************************************************\n'.bold.gray +
    '*****************'.bold.gray + ' \(╯°□°)╯'.bold.red + ' ︵ '.bold.gray +'ɹoɹɹǝ '.bold.blue + '*****************'.bold.gray +
    '\n****************************************************\n\n'.bold.gray +
    String(err) +
    '\n\n*******************************************************\n\n'.bold.gray );
  this.emit('end');
};
//estilos css
gulp.task('css', function(){
	return gulp.src('src/scss/main.scss')
		.pipe(plumber({
			errorHandler:onError
		}))
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: [
			'last 2 versions',
			'> 1%',
			'ie 9'
			]
			}))
		.pipe(gulp.dest('dist/css'));

});

//HTML
gulp.task('html', function(){
	return gulp.src('src')
    .pipe(gulp.dest('src'));


});
/*gulp.task('imagemin', function() {
    return gulp.src('./src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
    .pipe(gulp.dest('./dist/img'));
});*/

//Copiar las IMG de SRC a DIST
gulp.task('imagemin', function() {
    return gulp.src('./src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
    .pipe(gulp.dest('./dist/img'));
});
//natalia MAS O MENOS
gulp.task('sass',function(){
    return gulp.src('src/sass/main.scss')
    .pipe(sass ())
    .pipe(gulp.dest('src/css'))
});


//watch
gulp.task('browser-sync', ['css','html','imagemin'],function() {
    browserSync.init({
        server: {baseDir:'./dist'},
        files:[
        	'./dist/css/main.css'
        ]       
    });
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./src/img/*', ['imagemin']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./dist/*.html').on('change',browserSync.reload);
    //gulp.watch('./src/scss/**/*.scss', ['css']);
    //gulp.watch('./src/img/*', ['imagemin']);
    //gulp.watch('./src/js/*.js', ['js']);
    //gulp.watch('./dist/*.html', ['html']);
    //gulp.watch('./dist/*.html').on('change',browserSync.reload);
});
	