const moongoose = require('mongoose')

const DestinationSchema = new moongoose.Schema({
    inputCoord: [Number],
    inputBuilding:String,
    inputImg: String, 
    inputDescription: String,
    inputLink: String,
    inputTour: String
})

moongoose.model("destination", DestinationSchema)

