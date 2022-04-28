const { matchedData } = require("express-validator")
const { usersModel } = require ("../models")



const registerCtrl = async (req, res) => {

    try {
        req = matchedData(req)
        const dataUser = await usersModel.create(req) 
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