const AWS = require('aws-sdk');
const { jsonResponse, dynamoReturn } = require('./responseFunctions');
const dynamo = new AWS.DynamoDB.DocumentClient();

const getFromTable = async (tableName, keyObj)=>{
    try {
        const getQuery = await dynamo.get({
            TableName: tableName,
            Key: keyObj
        }).promise();
        return dynamoReturn(false, getQuery.Item);
    } catch (error) {
        return dynamoReturn(true, error);
    }
}

const queryFromTable = async (tableName, {primamyKey, primaryKeyVal, secondaryKey, secondaryKeyVal}, indexName)=>{
    try {
        const query = await dynamo.query({
            TableName: tableName,
            KeyConditionExpression: `#${primamyKey} = :${primaryKeyVal}` + secondaryKey != undefined ? `#${secondaryKey} = :${secondaryKeyVal}` : ``,
            ExpressionAttributeNames: {
                ["#" + primamyKey]: primamyKey,
                ["#"+secondaryKey]: secondaryKey
            },
            ExpressionAttributeValues: {
                [":" + primamyKeyVal]: primamyKeyVal,
                [":"+secondaryKeyVal]: secondaryKeyVal
            },
            IndexName: indexName
        }).promise()
        return dynamoReturn(false, query.Items)
    } catch (error) {
        return dynamoReturn(true, error)
    }
}

module.exports={getFromTable, queryFromTable}
