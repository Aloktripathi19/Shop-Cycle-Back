let express = require("express")
const { reg, login, alluser, deluser, islogin, isadmin } = require("../controler/usercont")
const { addshop, upload, verifiedshop, allshop, myshop, shopon, shopdel, editshop } = require("../controler/shopcont")
let rt = express.Router()

rt.post("/reg",reg)
rt.post("/login",login)
rt.get("/alluser",islogin,isadmin,alluser)
rt.delete("/deluser/:id",deluser)
rt.post("/addshop",upload.single("simg"),islogin,addshop)
rt.get("/verifiedshop",verifiedshop)
rt.get("/allshop",islogin,isadmin,allshop)
rt.get("/myshop/:uid",islogin,myshop)
rt.put("/shopon/:id",shopon)
rt.put("/editshop",islogin,editshop)
rt.delete("/shopdel/:id",shopdel)

module.exports = rt