const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  const headers = {
    "Content-Type": "application/json"
  };
  let statusCode = 400;
  let body = JSON.stringify('Missing params');
  if (!event.pathParameters) {
    return {
      statusCode,
      body,
      headers
    }
  }
  const { date } = event.pathParameters;

  if (!date) {
    return {
      statusCode,
      body,
      headers
    }
  }
  try {
    body = await dynamoDB
      .get({
        TableName: "appointments",
        Key: {
          date
        }
      })
      .promise();
    statusCode = 200;
  } catch (err) {
    statusCode = 400;
    body = err.message || err;
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers
  };
};
