const { refreshModel } = require("../models");

const handleLogout = async (req, res) => {
    //TODO On client, also delete the accessToken

    const cookies = req.cookies;
    console.log(cookies)
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Delete refreshToken in db if found
    const foundUser = refreshModel.destroy({where:{token:refreshToken}});
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports =  handleLogout 