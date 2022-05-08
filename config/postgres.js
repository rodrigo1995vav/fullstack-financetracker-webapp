const{Sequelize} = require("sequelize")


const database = process.env.POSTGRESDB

const username = process.env.POSTGRESUSER

const password = process.env.POSTGRESPASS

const host = process.env.POSTGRESHOST

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect:"postgres"
    }
) 

const dbConnectPostgres = async () =>{
    try {
        await sequelize.authenticate()
        await sequelize.sync({})
        console.log("Connection succed")
    } catch (e) {
        console.log("Connection ERROR", e)
    }
}

module.exports = {sequelize, dbConnectPostgres}