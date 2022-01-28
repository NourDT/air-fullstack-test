import {success, failure} from '../lib/response-lib'
import AWS from 'aws-sdk'

export async function main(event) {
  const headers = event.headers.Authorization
  const documentClient = new AWS.DynamoDB.DocumentClient()

  console.log('Invoke Event: ', event)
  if (!headers) {
    return failure('Unauthorized!', 401)
  }
  let encodedCred = headers.split(' ')[1]
  let plainCred = (Buffer.from(encodedCred, 'base64')).toString().split(':')

  let APIUsername = plainCred[0]
  let APIPassword = plainCred[1]
  if (!(APIUsername === process.env.API_USERNAME && APIPassword === process.env.API_PASSWORD)) {
    console.error('Invalid access!')
    return failure('Unauthorized!', 401)
  }

  const eParam = event.queryStringParameters
  if(!eParam.type) {
    return failure('type param required')
  }

  try {
    const bindParams = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      ExpressionAttributeNames:{
        "#p": "pk"
      },
      ExpressionAttributeValues: {
        ":partition": eParam.type
      },
      KeyConditionExpression: "#p = :partition",
    }
    let items = await documentClient.query(bindParams).promise()
    console.log(items)

    return success(JSON.stringify(items))
  } catch (error) {
    console.error('Failure for getting the data:\n', error)
    return failure('Internal Server Error', error.response.status)
  }
}

