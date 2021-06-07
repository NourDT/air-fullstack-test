function createResponse(data, error, statusCode) {
  return {
    statusCode: !statusCode ? 200 : statusCode,
    headers: {
      "Access-Control-Allow-Headers":
        "Content-Type,X-Apigw-Api-Id,X-Api-Key,Authorization,Token",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify({
      status: !error || error == null ? "success" : "fail",
      data: !data ? null : data,
      error: !error ? null : error,
    }),
  };
}

function error(code, message) {
  return {
    code: code,
    message: message,
  };
}

function sendSuccess(data) {
  return createResponse(data, null, 200);
}

function sendError(code, message) {
  return createResponse(null, error(code, message), 500);
}

exports.sendError = sendError;
exports.sendSuccess = sendSuccess;
exports.error = error;
