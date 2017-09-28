const convertFactory = require('electron-html-to');
const fs = require('fs');
//const fs = require('fs-extra');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json())


app.post('/', function(req, res){
  const conversion = convertFactory({
    converterPath: convertFactory.converters.PDF,
    allowLocalFilesAccess: true
  });
  conversion({ html: req.body.content }, (err, result) => {
    if (err) return console.error(err);
    result.stream.pipe(fs.createWriteStream('output.pdf')).then((data) =>{
       res.sendFile('output.pdf',{ root : __dirname}))
    });
    conversion.kill(); 
  });  

});

app.listen(3000);

