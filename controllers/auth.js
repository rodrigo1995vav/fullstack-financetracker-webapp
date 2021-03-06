const { matchedData } = require("express-validator")
const { usersModel, refreshModel } = require ("../models")
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
                "id":user.id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1h'
            }
        )

        const refreshToken = jwt.sign(
            {
                "id":user.id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '1d'
            }
        )

        console.log(user.id, refreshToken)
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None' , maxAge: 24 * 60 * 60 * 1000})
        res.send ({ accessToken, refreshToken })

        const refreshtokensave = await refreshModel.create({"token":refreshToken, "userId": user.id})
        if(!refreshtokensave){
            handleHttpError(res, "INVALID_token", 401)
            return
        }
        
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_LOGIN_USER") 
    }
}


module.exports = {registerCtrl, loginCtrl}