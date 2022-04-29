const { usersModel } = require("../models")
const { handleHttpError } = require ("../utils/handleError")
const  verifyToken  = require ("../utils/handleJwt.js")
 const jwt = require ('jsonwebtoken')

const authMiddleware = async(req, res, next) => {

    try {
        

        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        const authHeader = req.headers.authorization

        const token = authHeader.split(' ')[1]

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decode) => {
                if (err) return res.sendStatus(403)
                req.user = decode.name
                next()
            }
        )

        // const dataToken = await verifyToken(token)

        // console.log(token)

        // if (!dataToken){
        //     handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
        //     return
        // }

        // const query = {
        //     id:dataToken.id
        // }

        // const user = await usersModel.findOne(query)
        // req.user = user
        // next()
    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401)
    }
}
module.exports = authMiddleware