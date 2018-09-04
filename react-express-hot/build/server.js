var express = require('express');
var app = express();
var path = require('path');
var hotPath = path.resolve(__dirname);
var APP_PATH = path.resolve(hotPath, '../public');
app.use('/', express.static('public'));
app.get('/', function (req, res) {
 	res.sendFile(APP_PATH + '/index.html')
// 	var port = req.headers['host'].split(':')[1];
// 	switch(port){
// 		case '3000':
//             res.send('3000');
// 			break;
// 		case '8000':
//             res.send('8000');
//             break;
// 		default:
//             res.send('0');
// 	}

});
app.listen(3000, function() {
	console.log('正常打开3000端口')
});
