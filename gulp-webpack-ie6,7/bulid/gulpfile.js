var gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    spriter = require('gulp-css-spriter'),
    base64 = require('gulp-css-base64'),
    connect = require('gulp-connect'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    path=require("path"),
    fs=require("fs"),
    srcDir = path.resolve(process.cwd(), '../src/less'),
    lessPath = path.resolve(srcDir, ''),
    dirs = fs.readdirSync(lessPath),
    livereload = require('gulp-livereload'),
    del = require('del');
//清除任务
    gulp.task('cleanCss', function () {
        return del.sync('../dist/css/*',{force: true})
    });
    gulp.task('cleanJs', function () {
        return del.sync('../dist/js/*',{force: true})
    });
//html
    var  htmlDir = '../example/index.html';
    var  htmlDist = "../dist/";
//监听端口
    var host = {
        path: '../dist/index.html',
        port: '3000',
        root:"../dist"
    };
//less
    var  lessSrc ="../src/less/*.less";
    var  varsLess = 'allVars';
    var  cssDist = "../dist/css/";

//将图片拷贝到目标目录

 gulp.task('default', function () {
     return gulp.src('app/tmp/index.js')
         .pipe(clean({force: true}))//跨文件
         .pipe(gulp.dest('dist'));
 });


//发布版本--->
gulp.task('copy:images', function (done) {
  gulp.src(['src/images/**/*']).pipe(gulp.dest('dist/images')).on('end', done);
});
//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
  gulp.src('../dist/js/*.js')
    .pipe(md5(5, '../dist/index.html'))
    .pipe(gulp.dest('../dist/js'))
    .on('end', done);
});
//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', ['sprite'], function (done) {
  gulp.src('../dist/css/*.css')
    .pipe(md5(5, '../dist/index.html'))
    .pipe(gulp.dest('../dist/css'))
    .on('end', done);
});
//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('sprite', ['copy:images'], function (done) {
  var timestamp = +new Date();
  gulp.src('dist/css/style.min.css')
    .pipe(spriter({
      spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
      pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
      spritesmithOptions: {
        padding: 10
      }
    }))
    .pipe(base64())
    .pipe(cssmin())
    .pipe(gulp.dest('../dist/css'))
    .on('end', done);
});
//<----发布版本

//-->测试

//打包less
gulp.task('testLess', function (done) {
  //不能跨文件夹
  dirs.map(function (item) {
    if(item.split(".")[0]!=varsLess){
      gulp.src(['../src/less/'+varsLess+'.less','../src/less/'+item.split(".")[0]+'.less'])
        .pipe(concat(item))
        .pipe(less())
        .pipe(cssmin({compatibility: 'ie7'})) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest(cssDist))
        .on('end', done);
    }
  })
});


//webpack 打包 jsx/js 文件 --不能保证同步
// gulp.task("build-js", function(callback) {
//     webpack(webpackConfig).run(function(err, stats) {
//         gutil.log("[webpack]", stats.toString({
//             colors: true
//         }));
//     })
// });

// //引用webpack对js进行操作   run保证同步
var myDevConfig = Object.create(webpackConfig);
var devCompiler = webpack(myDevConfig);
    gulp.task("build-js", function(callback) {
        devCompiler.run(function(err, stats) {
            if(err) throw new gutil.PluginError("webpack:build-js", err);
            gutil.log("[webpack:build-js]", stats.toString({
                colors: true
            }));
            callback();//保证同步
        });
    });
//定义html任务
    gulp.task('html',function (done) {
        gulp.src(htmlDir)
            .pipe(gulp.dest(htmlDist))
            .pipe(connect.reload())
             .on('end', done);;
    });
//定义livereload任务
    gulp.task('connect', function () {
    connect.server({
        path: host.path,
        port: host.port,
        root: host.root,
        livereload: true
    });
});
// 比如当任务style依赖任务compass的执行结果的时候：
// gulp.task('style', ['compass'], function() {/* coding */});
//定义看守任务
    gulp.task('watch', function () {
       gulp.watch(lessSrc, ['testLess',"build-js",'html']);
       gulp.watch(["../src/**/*.js","../src/App.jsx"], ["build-js",'html']);
       gulp.watch(htmlDir, ['html']);
    });
//任务列表
    gulp.task("default",['cleanJs','testLess',"build-js",'html','watch','connect']);