var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var hotPath = path.resolve(__dirname);
var APP_PATH = path.resolve(hotPath, './../static'); //.定位当前
var HTML_PATH = path.resolve(hotPath, './../view'); //.定位当前
app.use(express.static(APP_PATH))
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'})
	res.end(fs.readFileSync(HTML_PATH+"/index.html"))
});

app.listen(8000, function() {
	console.log('正常打开8000端口')
});
