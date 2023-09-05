const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  let statusCodes = res.statusCodes === 200 ? 500 : res.statusCodes
  let message = err.message

  if (err.name == "CastError" && err.kind === "ObjectId") {
    message = `Resource not found`
    statusCodes = 404
  }

  res.status(statusCodes).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "development" : err.stack,
  })
}
export { notFound, errorHandler }
