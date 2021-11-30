import { config } from '../../config'

const RESPONSE_CODES = {
  200: '00',
  400: '04',
  401: '05',
  403: '10',
  500: '99',
}

const errorFormats = {
  development: ({
    message, status, customCode, err,
  }) => ({
    responseCode: RESPONSE_CODES[status] || '99',
    responseDetail: customCode || message,
    error: err.stack,
  }),
  production: ({ message, status, customCode }) => ({
    responseCode: RESPONSE_CODES[status] || '99',
    responseDetail: customCode || message,
    error: true,
  }),
  sketchy: () => 'Error ocurred while handling the request.',
}

const errorHandler = (err, _, res, __) => {
  const status = err.status || 500
  const message = err.message || 'Internal Error'
  let format = null

  if (status === 500) {
    console.error(err) // print with stack
  } else {
    console.warn(err)
  }

  if (config.env === 'dev') {
    format = err.format || 'development'
  } else { // production
    format = err.format || 'production'
  }

  res.status(status)
  res.json(errorFormats[format]({
    status, message, customCode: err.customCode, err,
  }))
}

export default errorHandler
