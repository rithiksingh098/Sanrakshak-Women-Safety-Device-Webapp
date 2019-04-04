var express = require("express");
var app = express();
const http = require('http');
const https = require('https');
// var request = require('sync-request');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "ejs")
app.use('/public', express.static('public'));
const path = require('path');
var email = ["rithik@gmail.com"];
var password = ["rithik"];
var Promise = require('promise');
app.get("/signup", function (req, res) {
    console.log("get signup");
    // res.sendFile(__dirname + '/signup.html');
    // res.sendFile(path.join(__dirname+'/signup.html'));//bootstrap notworking
    // res.sendFile('signup.html');//gives path must be absolute
    res.render("signupe");
});
app.post("/signup", function (req, res) {
    console.log("post sighnup");
    email.push(req.body.inputEmail);
    password.push(req.body.inputPassword);
    console.log(req.body);
    console.log(email);
    console.log(password);
    res.render("logine");
});
app.get("/login", function (req, res) {
    res.render("logine");
});
app.post("/login", function (req, res) {
    var times = [];
    var bp = [];
    var longitude, latitude;

    https.get('https://api.thingspeak.com/channels/730821/feeds.json?results=100', (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
            console.log(typeof data);
            h1();
            // h2();//put this in h1
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {


            var response = JSON.parse(data);
            // console.log(response);
            console.log(response.feeds);
            // console.log(data);
            // let json = JSON.stringify(data);
            // console.log(json);
            // console.log(JSON.parse(data).explanation);
            // console.log(JSON.parse(data).data);
            // console.log(data.channel);
            for (var i = response.feeds.length - 50; i < response.feeds.length; i++) {
                times.push(response.feeds[i].created_at);
                bp.push(response.feeds[i].field1);
            }
            console.log("recieved");
            // console.log("times" + times);
            // console.log("bp" + bp);
            // console.log("longitude" + longitude);
            // console.log("latitude" + latitude);
            // g();
        });

    }).on("error", (err) => {
        console.log("error body");
        console.log("Error: " + err.message);
    });
    // });
    // }
    // promise.then(() =>{
    // f().then(() => {
    //    () => {
    function g() {

        if (password[email.indexOf(req.body.inputEmail)] == req.body.inputPassword) {
            console.log("in g checked if");
            console.log("times" + times);
            console.log("bp" + bp);
            console.log("longitude" + longitude);
            console.log("latitude" + latitude);
            res.render("indexe", {
                bpp: bp,
                times: times,
                latitude: latitude,
                longitude: longitude
            });
        }
    }
    function h1() {
        https.get('https://api.thingspeak.com/channels/737141/fields/1.json?results=1', (resp) => {
            let data = '';
            console.log("in h1");
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
                console.log(typeof data);
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {

                
                var response = JSON.parse(data);
                // console.log(response);
                console.log("in h1 resp.on end");
                // latitude = response.feeds[0].field1;
                latitude = 12.840909;
                h2();
                // h2().then(() => g())

            });
        });
    }
    // function two() {
    //     return new Promise(resolve => {
    //         console.log("two");
    //         resolve();
    //     });
    // }
    function h2() {
        // return new Promise(resolve => {
            https.get('https://api.thingspeak.com/channels/737141/fields/2.json?results=1', (resp) => {
                let data = '';
                console.log("in h2 resp.on end");

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                    console.log(typeof data);
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    var response = JSON.parse(data);
                    // console.log(response);
                    console.log("in h2 resp.on end");
                    // longitude = response.feeds[0].field2;
                    longitude = 80.153723;
                    g();
                });
            });
            // resolve();
        // });
    }

    // f().then(g());
    // });
    // }



});


app.listen(3000);