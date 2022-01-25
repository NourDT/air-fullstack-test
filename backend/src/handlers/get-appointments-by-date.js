const moment = require('moment');

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const { AppointmentTable } = process.env;

// Validate user's input
const dateFormat = 'YYYYMMDD';
const validateUserInputs = ({ date }) => {
  const errorMessages = [];
  const validDate = moment(date, dateFormat).isValid();
  if (!validDate) {
    errorMessages.push(`Invalid date format, must be ${dateFormat}`);
  }
  if (errorMessages.length) {
    const error = new Error('Invalid request params');
    error.errors = errorMessages;
    throw error;
  }
};

/**
 * Fetch all appointments given a date (YYYYMMDD)
 */
exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(
      `getMethod only accept GET method, you tried: ${event.httpMethod}`,
    );
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  // Get date from pathParameters from APIGateway because of `/{date}` at template.yaml
  const { date } = event.pathParameters;

  try {
    validateUserInputs({ date });

    // Get the appointments from the table
    const data = await docClient
      .query({
        TableName: AppointmentTable,
        KeyConditionExpression: 'PK = :date',
        ExpressionAttributeValues: { ':date': date },
      })
      .promise();
    const items = data.Items.map((obj) => ({
      date: obj.PK,
      startTime: obj.startTime,
      endTime: obj.endTime,
      candidateInfo: obj.candidateInfo,
    }));

    const response = {
      statusCode: 200,
      body: JSON.stringify(items),
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
