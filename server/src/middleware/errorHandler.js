export function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode)

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    return res.status(400).json({
      success: false,
      message: `A resource with that ${field} already exists.`,
    })
  }

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid format for identifier: ${err.value}`,
    })
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message)
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages,
    })
  }

  // Log in development
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[Error] ${req.method} ${req.url}:`, err.message)
  }

  // Send safe JSON response (never leak stack trace in production)
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  })
}
