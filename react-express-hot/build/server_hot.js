var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config.hot');
var path = require('path');
var hotPath = path.resolve(__dirname);
var APP_PATH = path.resolve(hotPath, '../dist');
var proxyMiddleware = require('http-proxy-middleware')
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	inline: true,
	progress: true,
	stats: {
		colors: true,
	}
}));

//代理服务器
app.use('/shop', proxyMiddleware({
   target: 'http://192.169.45.164:8000',
   changeOrigin: true,
}))

//代理服务器
// app.use('/shopro', proxyMiddleware({
//     target: 'http://dev.fe.ptdev.cn',
//     changeOrigin: true,
// }))

app.use(require('webpack-hot-middleware')(compiler));

//将其他路由，全部返回index.html
app.get('*', function(req, res) {
	res.sendFile(APP_PATH + '/index.html')
});

app.listen(3000, function() {
	console.log('正常打开3000端口')
});
