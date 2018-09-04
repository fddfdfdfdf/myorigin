/**
 * Created by Administrator on 2017/7/18.
 */
var config = require("./webpack.config.js");
var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
//地址
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, '../src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'index'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, '../dist'); //发布文件所存放的目录/pxq/dist/前面加/报错？

//配置

config.entry = {
    index: ["babel-polyfill", APP_FILE],
    Vue:['vue'],
    VueRouterVuexAxios:['vue-router','vuex','axios'],
    // Vuex:['vuex'],
    // axios:['axios']
},
config.module.loaders.push({
    test: /\.css$/,
    exclude: /^node_modules$/,
    loader: ExtractTextPlugin.extract('vue-style-loader', ['css?modules&importLoaders=1&localIdentName=[local]', 'autoprefixer'])
})
config.module.loaders.push({
    test: /\.less$/,
    exclude: /^node_modules$/,
    loader: ExtractTextPlugin.extract('style', ['css?modules&importLoaders=1&localIdentName=[local]', 'autoprefixer','less'])
})
config.module.loaders.push({
    test: /\.scss$/,
    exclude: /^node_modules$/,
    loader: ExtractTextPlugin.extract('style', ['css?modules&importLoaders=1&localIdentName=[local]', 'autoprefixer', 'sass'])
})


config.output= {
        publicPath: '/vueMenu', //编译好的文件，在服务器的路径,域名会自动添加到前面
        path: BUILD_PATH, //编译到当前目录
        filename: 'js/[name].[hash].js', //编译后的文件名字
        chunkFilename: 'js/[name].[chunkhash:5].min.js',
},
config.plugins= [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production') //定义生产环境
        }
    }),
    new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
        filename: '../dist/index.html', //生成的html存放路径，相对于 path
        template: './src/template/index.html', //html模板路径
        inject:true
    }),
    new ExtractTextPlugin('css/[name].[hash].css'),
    //提取出来的样式和common.js会自动添加进发布模式的html文件中，原来的html没有
    new webpack.optimize.CommonsChunkPlugin("common", "js/[name].js"),
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false, // remove all comments
        },
        compress: {
            warnings: false
        }
    })
],

module.exports = config;