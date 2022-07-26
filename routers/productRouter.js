const express = require('express')
const { getFromTable } = require('../helperFunctions/dynamoFunctions')
const { jsonResponse } = require('../helperFunctions/responseFunctions')
const router = express.Router()

router.get('getproduct', async (req, res)=>{
    try {
        const {tableName, primaryKey, primaryKeyVal, secondaryKey, secondaryKeyVal} = req.body
        let product = await getFromTable(tableName, {
            primaryKey, primaryKeyVal, secondaryKey, secondaryKeyVal
        })
        return jsonResponse(null, product)
    } catch (error) {
        return jsonResponse(error, null)
    }
})