//var exec = require('child_process').exec;
var querystring = require('querystring'),
    fs = require('fs');
    formidable = require('formidable');

function start(res) {
  console.log('Request handler \'start\' was called.');
  /*
  exec('ls -lah', function (error, stdout, stderr) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write(stdout);
    res.end();
  */
  var body = '<html>'+
   '<head>'+
   '<meta http-equiv="Content-Type" content="text/html; '+
   'charset=UTF-8" />'+
   '</head>'+
   '<body>'+
   '<form action="/upload" enctype= "multipart/form-data" method="post">'+
   '<input type="file" name="upload" multiple= "multiple">'+
   '<input type="submit" value="Upload file" />'+
   '</form>'+
   '</body>'+
   '</html>';
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(body);
  res.end();

  /*
  function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }
  sleep(10000);
  return "Hello start"; // bad
  */
}

function upload(res, req) {
  console.log('Request handler \'upload\' was called.');
  var form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(req, function (error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "./tmp/test.png");
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("received image: <br/>");
    res.write("<img src='/show' />");
    res.end();
  });
  /*
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("You have sent: " + querystring.parse(postData).text);
  res.end();
  */
}

function show(res) {
  console.log('Request handler \'show\' was called.');
  fs.readFile('./tmp/test.png', 'binary', function (error, file) {
    if(error) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.write(error + '\n');
      res.end();
    } else {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.write(file, 'binary');
      res.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
