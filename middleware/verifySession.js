
const { handleHttpError } = require ("../utils/handleError")

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
                req.id = decode.id
                console.log(req.id)
                next()
            }
        )

    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401)
    }
}
module.exports = authMiddleware