var express = require("express");
var enforce = require('express-sslify');
var methodOverride = require("method-override");
var app = express();
var bodyParser = require("body-parser");
require('dotenv').config();
var flash = require("connect-flash");
var nodeGeocoder = require('node-geocoder');
var mongoose = require("mongoose");
require('dotenv').config();

// APP CONFIG
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/fam");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
require('dotenv').config();
//app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(flash());
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));



app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.general = req.flash();
    next();
});  

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
var geocoder = nodeGeocoder(options);

//MONGOOSE/MODEL CONFIG
var LocationSchema = new mongoose.Schema({
    location: String,
    lat: Number,
    lng: Number
});

var Location = mongoose.model("Location", LocationSchema);
var placesSource = "https://maps.googleapis.com/maps/api/js?key=" + process.env.GOOGLE_API + "&callback=createMap&libraries=places";
var mapSource = "https://maps.googleapis.com/maps/api/js?key=" + process.env.GOOGLE_API;

//MAIN ROUTES

app.get("/", function(req, res)
{
    if(res.err)
    {
        console.log("Error with /landing");
    }
    else
    {
        res.render("landing", {mapSource: mapSource}); 
    }
});

//CREATE - add new campground to DB
app.post("/",  function(req, res){
  console.log(req.body.location)
  geocoder.geocode(req.body.location, function (err, data) {
    console.log(data);
    if (err || !data.length) {
      console.log('Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newLocation = {location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    console.log(newLocation)
    Location.create(newLocation, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/");
        }
    });
  });
});
console.log("FAM")




app.listen(process.env.PORT || 8080, function(){
    console.log("The Server Has Started!");
});

