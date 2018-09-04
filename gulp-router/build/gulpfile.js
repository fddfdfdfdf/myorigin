/**
 Gulpfile for gulp-webpack-demo
 created by fwon
*/

var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    clean = require('gulp-clean'),
    spriter = require('gulp-css-spriter'),
    base64 = require('gulp-css-base64'),
    connect = require('gulp-connect'),
    ngmin = require('gulp-ngmin'),
    stripDebug = require('gulp-strip-debug'),
    url     = require('url'),
    proxy   = require('http-proxy-middleware'),
    htmlmin = require('gulp-htmlmin'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    csstext = require('postcss-cssnext'),
    shortcss = require('postcss-short'),
	ngAnnotate = require('gulp-ng-annotate'),
	uglify = require('gulp-uglify'),
    path = require('path'),
    fs = require('fs'),
    srcDir = path.resolve(process.cwd(), '../src'),
    browsersync = require('browser-sync').create();

//获取多页面的每个入口文件，用于配置中的entry

//html
var srcHtml = '../src/html/*.html',
    distHtml = '../dist/html';
//img
var srcImg = ['../src/img/**/*','../src/img/*'],
    distImg = '../dist/img';
//js
var srcJs = '../src/js/**/*js',
    distJs = '../dist/js/';
//less
var srcLess = '../src/less/*.less',
    distLess = '../dist/css/';

//监听接口
var host = {
    path: '../dist/',
    root:"../dist/",
    port: 3000,
    html: 'index.html'
};


//将图片拷贝到目标目录
gulp.task('copy:srcimg', function (done) {
    gulp.src(['../src/img/**/*'])
        .pipe(gulp.dest('../dist/img'))
        .pipe(connect.reload())
        .on('end', done);
});

//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
gulp.task('lessmin', function () {
    var jsPath = path.resolve(srcDir, 'css');
    var dirs = fs.readdirSync(jsPath);
    dirs.map(function (value,index) {
        if(value.split(".")[0] != "init"){
            gulp.src(['../src/css/init.less',"../src/css/"+value.split(".")[0]+".less"])
                .pipe(less())
                //这里可以加css sprite 让每一个css合并为一个雪碧图
                .pipe(postcss( [
                    shortcss,
               //     csstext({warnForDuplicates:false}),  //编译css4的变量
                    autoprefixer({browsers:'> 0%', cascade: false})
                ]))
                .pipe(concat(value.split(".")[0]+'.css'))
                .pipe(gulp.dest('../dist/css/'))
                .pipe(connect.reload());
        }
    })

});

//将js加上10位md5,并修改html中的引用路径，//必须加动作依赖
gulp.task('md5:js',["pipejs"], function (done) {
    gulp.src(distJs+"/*.js")
        .pipe(ngmin({dynamic: false}))
        .pipe(stripDebug())//去除console.log()
        .pipe(uglify({outSourceMap: false}))
        .pipe(md5(10, '../public/html/*.html'))
        .pipe(gulp.dest('../public/js'))
        .pipe(connect.reload());
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', ['copy:img'], function (done) {
    var timestamp = +new Date();
    gulp.src('../dist/css/*.css')
        //.pipe(spriter({
        //    spriteSheet: '../public/img/spritesheet' + timestamp + '.png',
         //   pathToSpriteSheetFromCSS: './img/spritesheet' + timestamp + '.png',
         //   spritesmithOptions: {
        //        padding: 10
        //    }
        //}))
        .pipe(base64({
            baseDir: '../dist',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8*1024, // bytes
            debug: true
        }))
        .pipe(cssmin())
        .pipe(md5(10, '../public/html/*.html'))
        .pipe(gulp.dest('../public/css'))
        .on('end', done);
});
//将图片拷贝到目标目录
gulp.task('copy:img', function (done) {
    gulp.src(['../dist/img/**/*'])
        .pipe(gulp.dest('../public/img'))
        .on('end', done);
});



gulp.task('clean', function (done) {
    gulp.src(['../dist'])
        .pipe(clean())
        .on('end', done);
});

gulp.task('watch', function (done) {
    gulp.watch(['../src/html/*.html'], ['distHtml']);
    gulp.watch(['../src/js/**/*.js'], ["pipejs",'distHtml']);
    gulp.watch(['../src/css/*.less'], ["lessmin",'distHtml']);
	//gulp.watch(['../src/css/*.css'], ['distHtml']);
});

gulp.task('connect', function () {
   // console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true,
        middleware: function (connect, opt) {
            return [
                proxy('/shop',{
                    target: 'http://192.169.45.164:8000',
                    changeOrigin: true,
                })
            ]
        }
    });
});

//调试 合并
gulp.task("pipejs", function(done) {
   gulp.src(srcJs)
       .pipe(gulp.dest(distJs))
       .pipe(connect.reload())
       .on('end', done);
});

//压缩
// gulp.task("pipejs", function(done) {
//     gulp.src(srcJs)
//         .pipe(stripDebug())
// 	    .pipe(concat('main.js'))
//         .pipe(gulp.dest(distJs))
//         .on('end', done);
// });

 

gulp.task("distHtml", function(done) {
    gulp.src(srcHtml)
        .pipe(gulp.dest(distHtml))
        .pipe(connect.reload())
        .on('end', done);
});

gulp.task("releaveHtml", function(done) {
    gulp.src('../dist/html/*.html')
        // .pipe(htmlmin({
        //     collapseWhitespace: true,
        //     removeComments: true
        // }))
        .pipe(gulp.dest('../public/html/'))
        .on('end', done);
});








//开发
gulp.task('dev', ['connect', 'copy:srcimg','lessmin', 'pipejs',"distHtml", 'watch']);

//发布
gulp.task('default', ["releaveHtml",'md5:css', 'md5:js']);