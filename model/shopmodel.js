let mongoose = require("mongoose")
let shopSch = mongoose.Schema({
    _id: String,
    name: String,
    uname: String,
    uid: String,
    phone:String,
    loct: String,
    pincode:Number,
    simg: String,
    city:String,
    states:String,
    shirt: Number,
    pant: Number,
    tshirt: Number,
    dryWash: Number,
    ishirt:Number,
    ipant:Number,
    itshirt:Number,
    wshirt:Number,
    wpant:Number,
    wtshirt:Number,
    verified: { type: String, default: "pending" },
    open: { type: Boolean, default: false }
})

let sm = mongoose.model("shop",shopSch)
module.exports = sm