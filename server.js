const path = require('path');
var express = require('express');
const videoStream = require('video-stream')
const fs = require('fs');
var ejs = require('ejs');
var app = express();



app.set('views',path.join(__dirname,'./views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.get('/', function (req, res) {
  res.send('Hello World!');
});
// video-stream route
app.get('/video/:filename', videoStream({ dir: path.resolve(__dirname,'./video') }))

app.get('/list-ejs',(req, res)=>{
    var filePath = path.resolve(__dirname,'./video'); 
    fs.readdir(filePath,function(err,files){
        var filenames = [];
        files.forEach(function(filename){
            filenames.push(filename);
        })
        console.log(filenames);
        res.render(
            'test',{
                title:'hello',
                file_names:filenames})
    })
    
});


app.use(express.static('./public'));
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});