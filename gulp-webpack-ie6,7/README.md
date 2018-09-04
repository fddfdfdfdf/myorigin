react 兼容ie8


--->方法- 不会产生文件 polyfill.js 文件
require("es5-shim");
require("es5-shim/es5-sham");
require("babel-polyfill");
《---

//babel-polyfill 使用方法 1.直接使用 2. entry 中使用


var webpack = require('webpack');
var path = require('path');
var minimize = process.argv.indexOf('--minimize') !== -1;
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
  devtool: 'cheap-module-eval-source-map',//加快访问
  entry: {
 --》 方法二 会产生 polyfill.js 文件
//    polyfill: [
//      'es5-shim',
//      'es5-shim/es5-sham'
//    ],
 《--
    app: [
      '../src/js/index.jsx'
    ]
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [

     --》解析 js
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ["es2015", "react"]
        },
        plugins: [
          "transform-es3-property-literals",
          "transform-es3-member-expression-literals",
          "transform-es2015-modules-simple-commonjs"
        ]
      },
      《---
      --》解析jsx
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets:['react','es2015']
        },
        plugins: [
          "transform-es3-property-literals",
          "transform-es3-member-expression-literals",
          "transform-es2015-modules-simple-commonjs"
        ]
        《---
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin('common.js'),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};



//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
  var jsPath = path.resolve(srcDir, 'js');
  var dirs = fs.readdirSync(jsPath);
  var matchs = [], files = {};
  dirs.forEach(function (item) {
    matchs = item.match(/(.+)\.js$/);
    console.log(matchs);
    if (matchs) {
      files[matchs[1]] = path.resolve(srcDir, 'js', item);
    }
  });
  console.log(JSON.stringify(files));
  return files;
}



.babelrc文件
 这个是babel6新加的，就是代表需要启动什么样的预设转码，在babel中，预设了6中，分别是

   es2015  ,stage-0 , stage-1 ,stage-2 , stage-3 ,React
   首先现在根目录先生存.babelrc文件

   这个文件是用来设置转码的规则和插件的


   如果想使用es6语法，必须安装插件


   npm install babel-preset-es2015

   {
   	"presets": ["es2015"]
   }


   什么是.babelrc文件呢？ 熟悉Linux的同学一定知道，rc结尾的文件通常代表运行时自动加载的文件，配置等等，类似bashrc,zshrc

   而且在babel6中，这个文件必不可少。


        里面可以对babel命令进行配置，以后再使用babel的cli的时候，可以少一些配置。

       还有一个env字段，可以对BABEL_ENV或者NODE_ENV指定的不同的环境变量，进行不同的编译操作

   "presets"

      这个是babel6新加的，就是代表需要启动什么样的预设转码，在babel中，预设了6中，分别是

      es2015  ,stage-0 , stage-1 ,stage-2 , stage-3 ,React


   require hook

    require hook 的作用就是替换原来的require，以便在自动加载对代码进行编译运行

    其实这个做的便是重写require.extensions 中对应的扩展名的加载程序，并且默认会判断这个文件是否是 node_modulesz中的模块。，如果是的

   话，那么将不会进行转换。否则的话进行转换

   基本的格式就是


   {
     "presets": [],
     "plugins": []
   }

   presets 字段是用来设定转码规则，，具体看官方的   https://babeljs.io/docs/plugins/


   先下载所要使用的转码规则 插件 然后将其写到  .babelrc文件 中

   presets 其实就是一堆plugins的预设起到了方便的作用 如果不采用 presets 完全可以单独引用某个功能


   {
     "presets": ["es2015", "stage-2"],
     "plugins": ["transform-runtime"],
     "comments": false
   }


  //bug解决
   warning.js?85a7:36Warning: Accessing PropTypes via the main React package is deprecated. Use the prop-types package from npm instead.
   warning.js?85a7:36Warning: RouterContext: React.createClass is deprecated and will be removed in version 16. Use plain JavaScript classes instead. If you're not yet ready to migrate, create-react-class is available on npm as a drop-in replacement.
  环境因素造成的
  解决方案
  webpack.config.js
     //    new webpack.DefinePlugin({
     //      'process.env': {
     //        NODE_ENV: JSON.stringify('production') //定义编译环境
     //      }
     //    }),

  Route.jsx
  //const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

  //注入引入react-router 的版本


es6兼容IE说明   https://segmentfault.com/a/1190000005128101