let mongoose = require("mongoose")
let userSch = new mongoose.Schema({
    _id:String,
    name:String,
    pwd:String,
    phno:String,
    role: {type: String, default :"user"}
})

let um = mongoose.model("user",userSch)

module.exports = um