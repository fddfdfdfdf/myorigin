var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

//定义地址
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, '../src'); //__dirname 中的src目录，以此类推
var M_FILE = path.resolve(APP_PATH, './m/M.jsx'); //根目录文件app.jsx地址
var P_FILE = path.resolve(APP_PATH, './p/P.jsx'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, '../dist/'); //发布文件所存放的目录

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        m: [
            "babel-polyfill",
            'webpack-hot-middleware/client?reload=true',//'webpack-hot-middleware/client   path=/__webpack_hmr&timeout=10000&',
            M_FILE
        ],
        p: [
            "babel-polyfill",
            'webpack-hot-middleware/client?reload=true',//'webpack-hot-middleware/client   path=/__webpack_hmr&timeout=10000&',
            P_FILE
        ]
    },
    output: { //输出目录
        publicPath: '', //编译好的文件，在服务器的路径,这是静态资源引用路径
        path: BUILD_PATH, //发布文件地址
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loaders: ['react-hot-loader/webpack', 'babel'],
            include: [APP_PATH]
        },
        {
            test: /\.scss$/,
            exclude: /^node_modules$/,
            loader: 'style-loader!css?modules&localIdentName=[path][name]-[local]!autoprefixer-loader!sass-loader'
        },
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            },
            {
                test: /\.less$/,
                exclude: /^node_modules$/,
                loader: 'style-loader!css?modules&localIdentName=[path][name]-[local]!autoprefixer-loader!less-loader'
            },
            {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=[name].[ext]',
            include: [APP_PATH]
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /^node_modules$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            include: [APP_PATH]
        }, {
            test: /\.jsx$/,
            exclude: /^node_modules$/,
            loaders: ['react-hot-loader/webpack', 'jsx', 'babel'],
            include: [APP_PATH]
        }]
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     $:"jquery",
        //     jQuery:"jquery",
        //     "window.jQuery":"jquery"
        // }),
        new webpack.DefinePlugin({
            //process.argv：当前进程的命令行参数数组。
            //process.env：指向当前shell的环境变量，比如process.env.HOME。
            'process.env': {
                NODE_ENV: JSON.stringify('development') //定义编译环境
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../m.html', //生成的html存放路径，相对于 path
            template: './src/template/M.html', //html模板路径
            hash: false,
            chunks: ['m']
        }),
        new HtmlWebpackPlugin({
            filename: '../p.html', //生成的html存放路径，相对于 path
            template: './src/template/P.html', //html模板路径
            hash: false,
            chunks: ['p']
        }),

        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    // externals: {
    //     'r': 'React',
    //     'rd': 'ReactDOM',
    //     'Im':"Immutable"
    // },
    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    },
    devServer: {
        proxy: {
            // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
            // koa 代码在 ./mock 目录中，启动命令为 npm run mock
            '/shop': {
                target: 'http://localhost:8000',
                secure: false
            }
        },
        // contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
};
