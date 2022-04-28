const handleHttpError = (res, text, code = 403) => {
    res.status(code)
    res.send({ error: text})
}

module.exports = {handleHttpError}