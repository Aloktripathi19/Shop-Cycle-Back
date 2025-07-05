let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const um = require("../model/usermodel")

let reg = async(req,res)=>{
    try{
        let obj = await um.findById({"_id":req.body._id})
        if (obj){
            res.json({"msg":"Email already Exist"})
        }else{
            let hashcode = await bcrypt.hash(req.body.pwd,10)
            let data = um({...req.body,"pwd":hashcode})
            await data.save()
            res.json({"msg":"registration done"})
        }
    }catch(err){
        res.json({"msg":"error in registration"})
    }
}

let login = async(req,res)=>{
    try{
        let obj = await um.findById({"_id":req.body._id})
        if(obj){
            let f = await bcrypt.compare(req.body.pwd,obj.pwd)
            if(f){
                res.json({"token":jwt.sign(obj._id,"spin"),
                    "_id":obj._id,"name":obj.name,"role":obj.role,"phno":obj.phno})
            }else{
                res.json({"msg":"Check your password"})
            }
        }else{
            res.json({"msg":"Oops email not found"})
        }
    }catch(err){
        res.json({"msg":"error in login"})
    }
}


let alluser = async(req,res)=>{
    try{
        let data = await um.find()
        res.json(data)
    }catch{
        res.json({"msg":"Unable to fetch"})
    }
}

let deluser = async(req,res)=>{
    try{
        await um.findByIdAndDelete({"_id":req.params.id})
        res.json({"msg":"user removed"})
    }catch(err){
        res.json({"msg":"unable to delete"})
    }
}

let islogin = async(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization, "spin")
        next()
    }catch(err){
        res.json({"msg":"please login first"})
    }
}


let isadmin = async (req, res, next) => {
    try {
        let obj = await um.findById({ "_id": req.headers.uid })
        if (obj && obj.role == "admin") {
            next()
        }
        else {
            res.json({ "msg": "you are not admin" })
        }
    }
    catch (err) {
        res.json({ "msg": "error in authorization" })
    }
}


module.exports = {reg, login,alluser,deluser,islogin,isadmin}