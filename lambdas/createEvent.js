const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require("uuid");

const createEvent = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const userName = requestBody.userName;
  const userID = requestBody.userID;
  const bookingDate = new Date(requestBody.bookingDate).toLocaleDateString();
  const bookingTime = requestBody.bookingTime;
  if (
    typeof userName !== "string" ||
    typeof userID !== "string" ||
    typeof bookingTime !== "string" ||
    typeof bookingDate !== "string"
  ) {
    console.error("Validation Failed");
    callback(
      new Error("Couldn't submit booking because of validation errors.")
    );
    return;
  }
  submitBooking(bookinginfo(userName, userID, bookingDate, bookingTime))
    .then((res) => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Sucessfully Booked",
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Unable to book data",
        }),
      });
    });
};

const submitBooking = (booking) => {
  console.log("Booking data");
  const bookinginfo = {
    TableName: process.env.TABLE,
    Item: booking,
  };
  return dynamoDb
    .put(bookinginfo)
    .promise()
    .then((res) => booking);
};
const bookinginfo = (userName, userID, bookingDate, bookingTime) => {
  return {
    id: uuidv4(),
    userName,
    userID,
    bookingDate,
    bookingTime,
  };
};
module.exports = createEvent;
