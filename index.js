var express = require('express');
var multer = require('multer');
var path = require('path');

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

var upload = multer({	storage : storage }).array('fileUpload',10);

//Serving Index.html
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'index.html'));
});

//Posting File
app.post('/api/v1/upload', function(req, res){
	upload(req, res, function(err){
		if(err){
			console.log(err.stack);
			return res.end('Something went wrong!!');
		}
		
		var responseString = '';
		var i = 0;
		
		if (req.files.length === 0){
			return res.end("Please select some file");
		}
		if(req.files.length === 1){
			responseString += req.files[0].originalname + ' has een uploaded successfully!!';
		}else{
			responseString += 'Following ' + req.files.length + ' files have been uploaded successfully:';
			for(i = 0; i < req.files.length; i++){
				responseString += '\n' + req.files[i].originalname;
			}
		}
		res.end(responseString);
	});
});

app.listen(8081, function(){
	console.log('Server listening on 8081');
});