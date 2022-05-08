const { refreshModel } = require ("../models")
const jwt = require("jsonwebtoken")
const { handleHttpError } = require("../utils/handleError")
const verifyToken = require("../utils/handleJwt")
require ('dotenv')


const handleRefreshToken = async (req, res) => {

    try {
        const cookies = req.cookies
        console.log(cookies)
        if(!cookies?.jwt)return res.sendStatus(401)
        console.log("ACA COOKIE" + cookies.jwt)
        const refreshToken = cookies.jwt

        const dataUser = await refreshModel.findOne({token:refreshToken})
        const user =  jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || dataUser.id !== decoded.id) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    { "id": decoded.id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                res.json({ accessToken })
            }
        )

    } catch (e){
        console.log(e)
    }
} 


module.exports = handleRefreshToken