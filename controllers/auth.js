const { matchedData } = require("express-validator")
const { usersModel } = require ("../models")
const { encrypt, compare} = require("../utils/handlePassword")



const registerCtrl = async (req, res) => {

    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password}
        const dataUser = await usersModel.create(body) 
        dataUser.set('password', undefined, {strict: false})
        res.send(dataUser)
    } catch (e){
        console.log(e)
    }
} 

const loginCtrl = async (req, res) =>{
    try {
        res.send ({"data":"data"})
        
    } catch (e) {
        console.log(e)
                
    }
}




module.exports = {registerCtrl, loginCtrl}