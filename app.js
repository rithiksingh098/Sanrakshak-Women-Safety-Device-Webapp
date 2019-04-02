var express= require("express");
var app=express();
const http=require('http');
const bodyparser=require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "ejs")
app.use('/public', express.static('public'));
const path = require('path');
var email=["rithik@gmail.com"];
var password=["rithik"];

app.get("/signup",function(req,res){
    console.log("get signup");
    // res.sendFile(__dirname + '/signup.html');
    // res.sendFile(path.join(__dirname+'/signup.html'));//bootstrap notworking
    // res.sendFile('signup.html');//gives path must be absolute
    res.render("signupe");
});
app.post("/signup",function(req,res){
    console.log("post sighnup");
    email.push(req.body.inputEmail);
    password.push(req.body.inputPassword);
    console.log(req.body);
    console.log(email);
    console.log(password);
    res.render("logine");
});
app.get("/login",function(req,res){
    res.render("logine");
});
app.post("/login",function(req,res){
    if(password[email.indexOf(req.body.inputEmail)]==req.body.inputPassword){
        res.render("indexe");
    }
});


app.listen(3000);