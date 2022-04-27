const pathModels = "./postgres"; 

const models = {
    usersModel: require(`${pathModels}/users`),
    transactionsModel: require(`${pathModels}/transactions`),
    categoriesModel: require(`${pathModels}/categories`),
}



module.exports = models