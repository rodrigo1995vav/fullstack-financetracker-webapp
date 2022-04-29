const jwt = require("jsonwebtoken")
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET



const verifyToken = async  (tokenJwt) =>{
    try {
        return jwt.verify(tokenJwt, ACCESS_TOKEN_SECRET)
    } catch (e) {
        return null
        
    }
  
}



module.exports =  verifyToken