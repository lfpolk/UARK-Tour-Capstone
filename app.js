var express = require("express");
var enforce = require('express-sslify');
var methodOverride = require("method-override");
var app = express();
var bodyParser = require("body-parser");
require('dotenv').config();
var flash = require("connect-flash");

// APP CONFIG
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
//app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.general = req.flash();
    next();
});  
//MAIN ROUTES

app.get("/", function(req, res)
{
    if(res.err)
    {
        console.log("Error with /landing");
    }
    else
    {
        res.render("landing"); 
    }
});


app.listen(process.env.PORT || 8080, function(){
    console.log("The Server Has Started!");
});