// Import all functions from put-item.js
const dynamodb = require('aws-sdk/clients/dynamodb');
const lambda = require('../../../src/handlers/put-appointment');
// Import dynamodb from aws-sdk

// This includes all tests for handler()
describe('Test handler', () => {
  let putSpy;

  // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
  beforeAll(() => {
    // Mock dynamodb get and put methods
    // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
    putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
  });

  // Clean up mocks
  afterAll(() => {
    putSpy.mockRestore();
  });

  // This test invokes handler() and compare the result
  it('should add appointment to the table', async () => {
    const returnedItem = {
      date: '20220125',
      startTime: '2200',
      endTime: '2210',
      candidateInfo: { name: 'Joema Nequinto' },
    };

    // Return the specified value whenever the spied put function is called
    putSpy.mockReturnValue({
      promise: () => Promise.resolve(returnedItem),
    });

    const event = {
      httpMethod: 'POST',
      body: JSON.stringify(returnedItem),
    };

    // Invoke handler()
    const result = await lambda.handler(event);
    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(returnedItem),
    };

    // Compare the result with the expected result
    expect(result).toEqual(expectedResult);
  });
});
