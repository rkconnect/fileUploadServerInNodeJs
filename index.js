var express = require('express');
var multer = require('multer');

var app = express();

//Multer config
var storage = multer.diskStorage({
	destination : function (req, file, callback){
		callback (null, './upload');
	},
	filename: function(req, file, callback){
		var name = file.originalname.split('.', 2);
		callback(null, name[0] + '-' + Date.now() + '.' + name[1]);
	}
});

var upload = multer({	storage : storage });

//Serving Index.html
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//Posting File
app.post('/api/v1/upload', upload.single('fileUpload'), function(req, res){
	if (req.file == null){
		return res.end("Please select some file");
	}
	res.end(req.file.originalname + " has been uploaded successfully!");
});

app.listen(8081, function(){
	console.log('Server listening on 8081');
});