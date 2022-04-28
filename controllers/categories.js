const { matchedData} = require("express-validator")
const { categoriesModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')


const getItems =  async(req,res) => {
    try {
        const data = await tracksModel.find({})
        res.send({data})  
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_ITEMS')
    }
}

const getItem = async(req, res) =>{
    try {
        //req = matchedData(req)
        const id = req.params.id
        console.log(id)
        const data = await categoriesModel.findByPk(id)
        res.send({data}) 
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

const createItem = async (req, res) =>{

    try {
        const body= req.body
        console.log(body)
        const data = await categoriesModel.create(body)
        res.send(data)
    } catch (e) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

const updateItem = async(req, res) =>{
    try {
        const {id, ...body}= matchedData(req)
        const data = await categoriesModel.findOneAndUpdate(id, body)
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_UPDATE_ITEMS')
    }

}
const deleteItem = async (req, res) =>{
    try {
        req = matchedData(req)
        const {id} = req
        const data = await categoriesModel.delete({_id:id})
        res.send({data}) 
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
}


module.exports = { getItems, getItem, createItem, updateItem, deleteItem}