const moment = require('moment');

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const { AppointmentTable } = process.env;

// Date and Time format
const dateFormat = 'YYYYMMDD';
const timeFormat = 'HHmm';

// Validate user's input
const validateUserInputs = ({
  date, startTime, endTime, candidateInfo,
}) => {
  const errorMessages = [];
  const validDate = moment(date, dateFormat).isValid();
  if (!validDate) { errorMessages.push(`Invalid date format, must be ${dateFormat}`); }
  const validStartTime = moment(startTime, 'HHmm').isValid();
  if (!validStartTime) { errorMessages.push(`Invalid start time format, must be ${timeFormat}`); }
  const validEndTime = moment(endTime, 'HHmm').isValid();
  if (!validEndTime) { errorMessages.push(`Invalid end time format, must be ${timeFormat}`); }
  if (
    !candidateInfo
    || typeof candidateInfo !== 'object'
    || !Object.keys(candidateInfo).length
  ) {
    errorMessages.push('Candidate info is required and must be an object');
  }
  if (errorMessages.length) {
    const error = new Error('Invalid request body');
    error.errors = errorMessages;
    throw error;
  }
};

// Check if user's input has an overlapping appointments
const validateOverlappingAppointment = async ({ date, startTime, endTime }) => {
  const result = await docClient
    .query({
      TableName: AppointmentTable,
      KeyConditionExpression:
        '#pk = :date',
      FilterExpression:
        ':userInputStart < #endTime AND :userInputEnd > #startTime',
      ExpressionAttributeNames: {
        '#pk': 'PK',
        '#startTime': 'startTime',
        '#endTime': 'endTime',
      },
      ExpressionAttributeValues: {
        ':date': date,
        ':userInputStart': startTime,
        ':userInputEnd': endTime,
      },
    })
    .promise();

  if (result.Count > 0) {
    const error = new Error('Appointment slot already taken');
    error.errors = result.Items;
    throw error;
  }
};

/**
 * Book an appointment in the given date with start time and end time.
 */
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`,
    );
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  // Get the body of the request
  const {
    date, startTime, endTime, candidateInfo,
  } = JSON.parse(event.body);

  try {
    // Validate user inputs
    validateUserInputs({
      date,
      startTime,
      endTime,
      candidateInfo,
    });

    // Validate if the user's input is not overlapping with other appointments
    await validateOverlappingAppointment({ date, startTime, endTime });

    // Creates a new item, or replaces an old item with a new item
    await docClient.put({
      TableName: AppointmentTable,
      Item: {
        PK: date,
        SK: `${startTime}-${endTime}`,
        startTime,
        endTime,
        candidateInfo,
      },
    }).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        date,
        startTime,
        endTime,
        candidateInfo,
      }),
    };
    // All log statements are written to CloudWatch
    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`,
    );
    return response;
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message, error }),
    };
  }
};
