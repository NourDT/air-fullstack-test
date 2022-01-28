import awsMock from 'aws-sdk-mock'
import hash from 'object-hash'
import faker from 'faker'

const helper = jest.genMockFromModule('../helper')

const paramStore = Object.create(null)

awsMock.mock('SSM', 'getParameter', (params, callback) => {
  if (paramStore[params.Name]) {
    callback(undefined, paramStore[params.Name])
  } else {
    // eslint-disable-next-line standard/no-callback-literal
    callback({ code: 'ParameterNotFound' })
  }
})

awsMock.mock('SSM', 'putParameter', (params, callback) => {
  paramStore[params.Name] = { Parameter: params }
  callback(undefined, {
    Version: faker.random.number()
  })
})

awsMock.mock('SQS', 'sendMessage', (params, callback) => {
  callback(undefined, {
    MessageId: faker.random.uuid(),
    MD5OfMessageBody: hash.MD5(params.MessageBody),
    MD5OfMessageAttributes: hash.MD5(params.MessageAttributes)
  })
})

awsMock.mock('SQS', 'changeMessageVisibility', (params, callback) => {
  callback(undefined, {
    RequestId: faker.random.uuid()
  })
})

awsMock.mock('SQS', 'deleteMessage', (params, callback) => {
  callback(undefined, {
    RequestId: faker.random.uuid()
  })
})

awsMock.mock('SNS', 'publish', (params, callback) => {
  callback(undefined, {
    MessageId: faker.random.uuid()
  })
})

const real = jest.requireActual('../helper')

helper._set_mock_client_credentials = () => {
  paramStore[process.env.SSM_PARAM_NS + '/MSA_CLIENT_ID'] = {
    Parameter: {
      Name: process.env.SSM_PARAM_NS + '/MSA_CLIENT_ID',
      Value: 'MOCK_CLIENT_ID',
      Type: 'String'
    }
  }
  paramStore[process.env.SSM_PARAM_NS + '/MSA_CLIENT_SECRET'] = {
    Parameter: {
      Name: process.env.SSM_PARAM_NS + '/MSA_CLIENT_SECRET',
      Value: 'MOCK_CLIENT_SECRET',
      Type: 'String'
    }
  }
}

helper._set_mock_access_token = (token) => {
  paramStore[process.env.SSM_PARAM_NS + '/MSA_ACCESS_TOKEN'] = {
    Parameter: {
      Name: process.env.SSM_PARAM_NS + '/MSA_ACCESS_TOKEN',
      Value: token,
      Type: 'String'
    }
  }
}

helper._set_mock_data = (name, parameter) => {
  paramStore[process.env.SSM_PARAM_NS + '/' + name] = {
    Parameter: {
      Name: process.env.SSM_PARAM_NS + '/' + name,
      Value: '',
      Type: 'String',
      ...parameter
    }
  }
}

helper._aws_mock_restore = () => {
  awsMock.restore()
}

helper.enqueue_failed_job = jest.fn(real.default.enqueue_failed_job)

helper.publish_sns_message = jest.fn(real.default.publish_sns_message)

helper.release_failed_job = jest.fn(real.default.release_failed_job)

helper.delete_failed_job = jest.fn(real.default.delete_failed_job)

helper.notify_on_error = jest.fn(real.default.notify_on_error)

helper.notify_on_failed_queue = jest.fn(real.default.notify_on_failed_queue)

// noinspection JSUnusedGlobalSymbols
export default {
  ...real.default,
  ...helper
}
