const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Destination')
var cors = require('cors')
const axios = require('axios')

app.use(cors())

const Destination = mongoose.model('destination')

const mongourl = MONGODB_URL;

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongo")
})
mongoose.connection.on("error", (err) => {
    console.log("error", err)
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/',(req,res)=>{
    Destination.find({}).then(data=>{
        console.log(data)
        res.send(data)
        
    }).catch(err=>{
        console.log(err)
    })
    
})

app.post('/send-data',(req,res)=>{
    const employee = new Destination({
        inputCoord: req.body.inputCoord,
        inputBuilding: req.body.inputBuilding,
        inputImg: req.body.inputImg, 
        inputDescription: req.body.inputDescription,
        inputLink: req.body.inputLink
    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})


