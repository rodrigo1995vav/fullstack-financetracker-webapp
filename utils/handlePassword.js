const bcrypt = require("bcrypt")

const encrypt = async(passwordPlain) => {
    const hash = await bcrypt.hash(passwordPlain, 10)
    return hash

}
/**
 * 
 * Compare the hashed pass and the plain pass 
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async(passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}

module.exports = { encrypt, compare}