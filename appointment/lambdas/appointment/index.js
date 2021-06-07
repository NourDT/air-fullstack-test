const response = require("./response");
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const VALID_START_TIME = process.env.VALID_START_TIME;
const VALID_END_TIME = process.env.VALID_END_TIME;
const APPOINTMENT_TABLE = process.env.APPOINTMENT_TABLE;

async function getAppointmentsByDate(date) {
  var params = {
    TableName: APPOINTMENT_TABLE,
    IndexName: "byDate",
    KeyConditionExpression: "#date = :date",
    ExpressionAttributeValues: {
      ":date": date,
    },
    ExpressionAttributeNames: {
      "#date": "date",
    },
  };
  let appointments = await dynamodb.query(params).promise();
  let timeslots = appointments.Items.map((appt) => {
    return {
      startTime: appt.startTime,
      endTime: appt.endTime,
      duration: appt.duration,
    };
  });
  let response = {
    timeSlots: timeslots,
    validStartTime: VALID_START_TIME,
    validEndTime: VALID_END_TIME,
  };
  return response;
}

exports.handler = async (event) => {
  const promise = new Promise(async function (resolve) {
    const request = JSON.parse(event.body);
    if (!request.date) {
      resolve(response.sendError(490, "Bad Request: Missing required data"));
    }
    try {
      console.log(request);
      let timeslots = await getAppointmentsByDate(request.date);
      resolve(response.sendSuccess(timeslots));
    } catch (error) {
      resolve(response.sendError(-999, `${error.name} : ${error.message}`));
    }
  });
  return promise;
};
