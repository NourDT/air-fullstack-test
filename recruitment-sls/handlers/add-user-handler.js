import AWS from 'aws-sdk'
import {failure, success} from '../lib/response-lib'
import uuidv5 from 'uuidv5'

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

  if (!event.hasOwnProperty('body') || !event.body || !JSON.parse(event.body)) {
    return failure('Invalid body received from event request.')
  }
  const request = JSON.parse(event.body)
  const dateCreated = new Date().toISOString()
  const id = 'USR'.concat('#', uuidv5('null', dateCreated + request.name + '_' + request.email))

  try{
    const putParams = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      Item: {
        pk: '1001', // partition for user
        id: id,
        name: request.name,
        email: request.email,
        createdAt: dateCreated,
        type: 'CAND' // candidate
      }
    }
    console.log('Dynamo parameters: ', putParams)
    const item = await documentClient.put(putParams).promise()
    console.log(item)
    return success('User Successfully saved!')
  }catch (error) {
    console.error('Failure for saving the data:\n', error)
    return failure(error)
  }
}

