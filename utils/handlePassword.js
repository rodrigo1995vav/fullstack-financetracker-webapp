const bcryptjs = require("bcryptjs")

const encrypt = async(passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash

}
/**
 * 
 * Compare the hashed pass and the plain pass 
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async(passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}

module.exports = { encrypt, compare}