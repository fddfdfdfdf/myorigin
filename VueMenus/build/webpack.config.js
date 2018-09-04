/**
 * Created by Administrator on 2017/7/18.
 */
var path = require("path");
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, '../src'); //__dirname 中的src目录，以此类推
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包

module.exports = {
    module: {
        loaders: [{
            test: /\.vue$/,
            exclude: /^node_modules$/,
            loader: 'vue-loader'
        },{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loader: 'babel',
            include: [APP_PATH],
            query: {
                presets: ['es2015','stage-0'],
                plugins: [
                    "transform-runtime"
                ]
            }
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=[name].[ext]'
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /^node_modules$/,
            loader: 'url-loader?limit=100&name=images/[hash:8].[name].[ext]',
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        },
        extensions: ['', '.js', '.vue', '.less', '.scss', '.css'] //后缀名自动补全
    }
}