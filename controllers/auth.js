const { usersModel } = require ("../models")



const registerCtrl = async (req, res) => {

    try {
        const body = req.body
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