const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getEventByDate = (event, context, callback) => {
  console.log("event", event);
  const { queryStringParameters } = event;
  const date = new Date(queryStringParameters.date).toLocaleDateString();

  const params = {
    TableName: process.env.TABLE,
    FilterExpression: "bookingDate = :dt",
    ExpressionAttributeValues: { ":dt": date },
  };

  dynamoDb
    .scan(params)
    .promise()
    .then((response) => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(response.Items),
      });
    })
    .catch((error) => {
      console.log("err", error);
      callback(null, {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify([]),
      });
    });
};
module.exports = getEventByDate;
