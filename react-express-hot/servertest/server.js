var express = require('express');
var app = express();
var path = require('path');
var hotPath = path.resolve(__dirname);
var APP_PATH = path.resolve(hotPath, './public');
app.use(express.static(APP_PATH))
app.use(express.static('public'));

app.get('/shop/banner', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
	var dd = require("./resData/bars.js");
    res.send(dd)
});

app.get('/shop/shopLists', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var dds = require("./resData/barsLists.js");
    res.send(dds)
});

app.get('/shop/imgLists', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var imgs = require("./resData/imgList.js");
    res.send(imgs)
});

app.listen(8000, function() {
	console.log('正常打开8000端口')
});
