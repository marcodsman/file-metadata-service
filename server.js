'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var bodyParser = require('body-parser');


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

// require and use "multer"...
// store file in memory. Probably wont work with very large files
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// My code here:
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
  const file = req.file;
  // Handle error
  if(!file){
    res.json({error: "Please upload a file"});
  }
  res.json({ name: file.originalname, type: file.mimetype, size: file.size});

});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
