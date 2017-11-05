const express = require('express');
const app = express();

const exphbs = require('express-handlebars');

const spawn = require("child_process").spawn;

const path = require('path')
const fs = require('fs');

// map_loading = "block";
// hashtags_loading = "none";
// sentiment_loading = "block";
// display_button = "block";

app.use(express.static(path.join(__dirname)));

/* SET UP HANDLEBARS */
// exphbs({layoutsDir: path.join(__dirname)});
// const hbs = exphbs.create({layoutsDir: path.join(__dirname)});

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname));



app.get('/', function(req, res){
    // res.sendFile("index.html");
    res.sendFile(path.join('index.html'));
    // res.render('index.html');

    // res.render('index.handlebars', {
    //     // helpers: {
    //     //     map_loading: function(){
    //     //         return map_loading;
    //     //     },
    //     //     hashtags_loading: function(){
    //     //         return hashtags_loading;
    //     //     },
    //     //     sentiment_loading: function(){
    //     //         return sentiment_loading;
    //     //     },
    //     //     display_button: function(){
    //     //         return display_button;
    //     //     }
    //     // }
    // });
});

// fs.watchFile('hashtags.json', function(curr, prev){
//     if (curr.dev != 0) {
//         console.log('*#*#*#\nFILE UPDATED/CREATED');
//         hashtags_loading = "block";
//         sentiment_loading = "block";
//         display_button = "none";
//     }
// });

app.listen(8080, function(){
    // var process = spawn('python', [__dirname + "/scripts/parser.py"]);
    console.log("Listening on 8080");
});
