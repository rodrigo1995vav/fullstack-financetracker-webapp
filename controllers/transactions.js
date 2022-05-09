const { transactionsModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')


const getItems =  async(req,res) => {
    try {
        const data = await transactionsModel.findAll({where:{userId:req.id}})
        res.send({data})  
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_ITEMS')
    }
}

const getLastTen = async(req, res) =>{
    try {
        const id = req.params.id
        console.log(id)
        const data = await transactionsModel.findAll({limit: 10, where:{userId:req.id}})
        res.send({data}) 
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

const createItem = async (req, res) =>{

    try {
        req.body.userId = req.id
        const body= req.body
        console.log(body)
        const data = await transactionsModel.create(body)
        res.send(data)
    } catch (e) {
        handleHttpError(res, 'ERROR_CREATE_ITEMSss')
    }
}

const updateItem = async(req, res) =>{
    try { 
        const data = await transactionsModel.update(req.body,
        { where: { id: req.params.id }, returning: true })
        res.send(data[1])
    } catch (e) {
        handleHttpError(res, 'ERROR_UPDATE_ITEMS')
    }

}

const deleteItem = async (req, res) =>{
    try {
        const id = req.params.id
        await transactionsModel.destroy({where:{id:id}})
        res.send("Success") 
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
}


module.exports = { getItems, getLastTen, createItem, updateItem, deleteItem}