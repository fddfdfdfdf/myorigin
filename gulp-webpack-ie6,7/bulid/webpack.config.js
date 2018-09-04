/**
 * Created by liaoyf on 2016/10/25 0025.
 */
require("es5-shim");
require("es5-shim/es5-sham");
require("babel-polyfill");

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
//    polyfill: [
//      'es5-shim',
//      'es5-shim/es5-sham'
//    ],
    app: [ //不能这么引入只能require
      // 'es5-shim',
      // 'es5-shim/es5-sham',
      // 'babel-polyfill',
      '../src/js/ie.js'
    ]
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ["es2015", "stage-0"]
        },
        plugins: [
            "transform-es3-property-literals",
            "transform-es3-member-expression-literals",
            "transform-es2015-modules-simple-commonjs",
            "transform-es2015-classes",
            { "loose": true },
          "transform-proto-to-assign",
          "transform-runtime",
       ]
      },
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
      }
    ]
  },
  resolve:{
    extensions:['','.jsx','.js','json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production') //定义编译环境
      }
    }),
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