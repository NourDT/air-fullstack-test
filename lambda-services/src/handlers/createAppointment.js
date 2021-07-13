const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  const tableName = 'appointments';
  let respBody = JSON.stringify('Missing data');
  let statusCode = 400;
  let date;
  let time;
  let id;
  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    if (!body.date || !body.id || !body.time) {
      return {
        statusCode,
        body: respBody,
        headers
      }
    }
    date = body.date;
    id = body.id;
    time = body.time;
  }

  // First check if appointment timing is still available
  try {
    const data = await dynamoDB.get({
      TableName: tableName,
      Key: {
        date
      }
    }).promise();

    // if time is already taken
    if (data.Item && data.Item.appointments.some(appointment => appointment.time === time)) {
      return {
        statusCode: 400,
        body: JSON.stringify('Time not available'),
        headers
      }
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e.message || e),
      headers
    }
  }
  
  // Create appointment
  try {
    const resp = await dynamoDB.update({
        TableName: tableName,
        Key: {
          date
        },
        UpdateExpression: "SET #ri = list_append(if_not_exists(#ri, :empty_list), :vals)",
        ExpressionAttributeNames: {
          "#ri": "appointments"
        },
        ExpressionAttributeValues: {
          ":vals": [{ id, time }],
          ":empty_list": []
        },
        ReturnValues: 'ALL_NEW'
    }).promise();
    respBody = JSON.stringify('ok')
    statusCode = 200;
  } catch (err) {
    console.log(err, 'the error!!')
    statusCode = 500,
    respBody = JSON.stringify(err.message || err)
  }
  return {
    statusCode,
    body: respBody,
    headers
  };
};
