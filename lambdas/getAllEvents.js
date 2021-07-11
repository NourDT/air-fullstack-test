const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getAllEvents = (event, context, callback) => {
  var params = {
    TableName: process.env.TABLE,
    ProjectionExpression: "ID, userName, userID, bookingDate, bookingTime",
  };

  console.log("Scanning booking table.");
  const onScan = (err, data) => {
    if (err) {
      console.log(
        "Scan failed to load data. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      callback(err);
    } else {
      console.log("Scan succeeded.");
      return callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          bookings: data.Items,
        }),
      });
    }
  };

  dynamoDb.scan(params, onScan);
};
module.exports = getAllEvents;
