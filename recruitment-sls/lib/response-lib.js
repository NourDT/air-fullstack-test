export function success (body) {
  return buildResponse(200, body)
}

export function failure (body, statusCode = 500) {
  console.log(statusCode)
  return buildResponse(statusCode, body)
}

function buildResponse (statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: body
  }
}
