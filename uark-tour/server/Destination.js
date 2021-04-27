const moongoose = require('mongoose')

const DestinationSchema = new moongoose.Schema({
    inputCoord: [Number],
    inputBuilding:String,
    inputImg: String, 
    inputDescription: String,
    inputLink: String
})

moongoose.model("destination", DestinationSchema)

