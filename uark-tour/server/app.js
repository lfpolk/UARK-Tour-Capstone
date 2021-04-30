const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Destination')
var cors = require('cors')
require('dotenv').config()

app.use(cors())

const Destination = mongoose.model('destination')

const mongourl = process.env.MONGODB_URL;

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.connection.on("connected", () => {
})
mongoose.connection.on("error", (err) => {
    console.log("error", err)
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/',(req,res)=>{
    Destination.find({ inputTour: req.query.inputTour }).then(data=>{
        res.send(data)
        
    }).catch(err=>{
        console.log(err)
    })
    
})

app.post('/send-data',(req,res)=>{
    const destination = new Destination({
        inputCoord: req.body.inputCoord,
        inputBuilding: req.body.inputBuilding,
        inputImg: req.body.inputImg, 
        inputDescription: req.body.inputDescription,
        inputLink: req.body.inputLink,
        inputTour: req.body.inputTour
    })
    destination.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})

app.delete("/delete", (req, res) => {
    Destination.deleteOne({ _id: req.body._id }).then(function(){
        console.log("Data deleted"); // Success
        res.send("Data Deleted");
    }).catch(function(err){
        console.log(err); // Failure
    });
});

app.listen(process.env.PORT || 8080, function(){
    console.log("The Server Has Started!");
});

