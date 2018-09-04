Uncaught RangeError: Maximum call stack size exceeded

在package.json里的script里使用了--hot和在webpack.config.js里调用了HotModuleReplacementPlugin,最后把webpack.config.js里的HotModuleReplacementPlugin去掉就好
不能多次配置

//热加载 webpack
　"scripts": {
　　"test": "echo \"Error: no test specified\" && exit 1",
　　"react": "webpack --config webpack.react.config.js",
　　"build": "webpack-dev-server --hot --inline --content-base ./build/",
　　"build-react": "webpack-dev-server --port 3000 --hot --inline --content-base ./react-build/ --config webpack.react.config.js"
}

  "dependencies": {
    "github-markdown-css": "^2.4.0",
    "immutable": "^3.8.1",
    "isomorphic-fetch": "^2.2.1",
    "jquery": "^3.3.1",
    "normalize.css": "^4.1.1",
    "pure-render-decorator": "^1.2.1",
    "react": "^15.6.2",
    "react-dom": "^15.6.2",
    "react-redux": "^4.4.5",
    "react-router": "^2.8.1",
    "redux": "^3.6.0",
    "redux-immutablejs": "^0.0.8",
    "redux-promise": "^0.5.3",
    "redux-thunk": "^2.1.0"
  },
  "devDependencies": {
    "autoprefixer-loader": "^3.2.0",
    "babel-core": "^6.18.2",
    "babel-loader": "^6.2.8",
    "babel-plugin-transform-class-properties": "^6.23.0",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",
    "babel-polyfill": "^6.26.0",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-react-hmre": "^1.1.1",
    "babel-preset-stage-0": "^6.16.0",
    "body-parser": "^1.15.1",
    "css-loader": "^0.23.1",
    "express": "^4.14.0",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.8.5",
    "html-webpack-plugin": "^2.22.0",
    "http-proxy-middleware": "^0.17.3",
    "jsx-loader": "^0.13.2",
    "less": "^2.6.1",
    "less-loader": "^2.2.3",
    "node-sass": "^4.7.2",
    "react-hot-loader": "^1.3.1",
    "react-transform-catch-errors": "^1.0.2",
    "react-transform-hmr": "^1.0.4",
    "redbox-react": "^1.3.3",
    "sass": "^0.5.0",
    "sass-loader": "^4.0.2",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "webpack": "^1.13.0",
    "webpack-dev-middleware": "^1.8.4",
    "webpack-dev-server": "1.14.1",
    "webpack-hot-middleware": "^2.13.2"
  },



    webpack 执行一次开发时的编译
    webpack -p 执行一次生成环境的编译（压缩）
    webpack --watch 在开发时持续监控增量编译（很快）
    webpack -d 让他生成SourceMaps
    webpack --progress 显示编译进度
    webpack --colors 显示静态资源的颜色
    webpack --sort-modules-by, --sort-chunks-by, --sort-assets-by 将modules/chunks/assets进行列表排序
    webpack --display-chunks 展示编译后的分块
    webpack --display-reasons 显示更多引用模块原因
    webapck --display-error-details 显示更多报错信息
升级React16

//如有此问题：Module not found: Error: Can't resolve 'react/lib/ReactMount'
npm install react-hot-loader@^3.1.3
/*
* Error: Module'.../node_modules/react-hot-loader/index.js' 
* is not a loader (must have normal or pitch function)
*/
//webpack修改react-hot-loader ==》react-hot-loader/webpack
{
    test: /\.js$/, loader:'react-hot-loader/webpack',
    exclude: /node_modules/
},


//https://www.cnblogs.com/wonyun/p/6030090.html  //=====html-webpack-plugin配置项

{
	"compact": false,
  	"presets": [
  		"react",
  		"es2015",
		"stage-0"
  	],
  	"plugins": [
		"add-module-exports",
		"syntax-dynamic-import",
		"transform-async-to-generator",
		"transform-regenerator",
		"transform-runtime",
        "transform-decorators-legacy",
        "transform-class-properties"
    ]
}
webpack支持
3、import()；v2支持，v1不支持