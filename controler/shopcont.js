let { v4 } = require("uuid")
let multer = require("multer")
const sm = require("../model/shopmodel")
let fs = require("fs")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './shopimgs')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.mimetype.split("/")[1])
    }
})

const upload = multer({ storage: storage })


let addshop = async (req, res) => {
    try {
        let data = sm({ ...req.body,"simg":req.file.filename, "_id": v4() })
        await data.save()
        res.json({ "msg": "Wait for verification" })
    } catch (err) {
        res.json({ "msg": "Error in adding data" })
    }
}

let verifiedshop = async(req,res)=>{
    try{
        let data = await sm.find({"verified":"accept"})
        res.json(data)
    }catch(err){
        res.json({"msg":"unable to fetch the data"})
    }
}

let allshop = async(req,res)=>{
    try{
        let data = await sm.find()
        res.json(data)
    }catch(err){
        res.json({"msg":"cannot fetch the details"})
    }
}

let myshop = async(req,res)=>{
    try{
        let data = await sm.find({"uid":req.params.uid})
        res.json(data)
    }catch(err){
        res.json({"msg":"Unable to fetch the data"})
    }
}

let shopon = async(req,res)=>{
    try{
        await sm.findByIdAndUpdate({"_id":req.params.id},req.body)
        res.json({"msg":"update done"})
    }catch(err){
        res.json({"msg":"err in update"})
    }
}

let editshop = async(req,res)=>{
    try{
        await sm.findByIdAndUpdate({"_id":req.body._id},req.body)
        res.json({"msg":"update done"})
    }catch(err){
        res.json({"msg":"err in update"})
    }
}



let shopdel = async(req,res)=>{
    try{
        let obj = await sm.findByIdAndDelete({"_id":req.params.id})
        fs.rm(`./shopimgs/${obj.simg}`, () => {})
        res.json({"msg":"shop deleted"})
    }catch(err){
        res.json({"msg":"unable to delete"})
    }
}



module.exports = { addshop,upload, verifiedshop,allshop,myshop,shopon,shopdel, editshop}