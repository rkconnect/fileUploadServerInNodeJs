var express = require('express');
var multer = require('multer');

var app = express();

//Multer config
var storage = multer.diskStorage({
	destination : function (req, file, callback){
		callback (null, './upload');
	},
	filename: function(req, file, callback){
		callback(null, file.fieldname + '-' + Date.now());
	}
});

var upload = multer({	storage : storage });

//Serving Index.html
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//Posting File
app.post('/api/v1/upload', upload.single('fileUpload'), function(req, res){
	res.end(req.file.originalname + "has been uploaded successfully!");
});

app.listen(8081, function(){
	console.log('Server listening on 8081');
});