const { matchedData } = require("express-validator")
const { usersModel } = require ("../models")
const jwt = require("jsonwebtoken")
const { encrypt, compare} = require("../utils/handlePassword")
const { handleHttpError } = require("../utils/handleError")
require ('dotenv')



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
        req = matchedData(req)
            const user = await usersModel.findOne({ where: { email: req.email } })
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }

        const hashPassword = user.password
        console.log({hashPassword})
        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        const accessToken = jwt.sign(
            {
                "username":user.name
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '30s'
            }
        )

        const refreshToken = jwt.sign(
            {
                "username":user.name
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '1d'
            }
        )



        res.send ({ refreshToken, accessToken })
        
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_LOGIN_USER") 
    }
}




module.exports = {registerCtrl, loginCtrl}