const express = require('express');
const app = express();

const spawn = require("child_process").spawn;

const path = require('path')
const fs = require('fs');

app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


fs.watchFile('hashtags.json', function(curr, prev){
    if (curr.dev != 0) {
        console.log('*#*#*#\nFILE UPDATED/CREATED');
    }
})

app.listen(8080, function(){
    var process = spawn('python', [__dirname + "/scripts/parser.py"]);
    console.log("Listening on 8080");
});
