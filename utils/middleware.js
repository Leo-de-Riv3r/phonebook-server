const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const errorHandler = (err , req, res, next) => {
  console.log(err.message)
  if (err.name === 'CastError') {
    return res.status(404).send({ err: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message })
  } else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }
  next(err)
}


// Extracts the token from the request header
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }
  next();
}

const userExtractor = async (request, response, next) => {
  try {
  const token = request.headers["authorization"].split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
  } catch(e) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
}


//middleware
const unknownEndpoint = (request, response) => {
  //the last middleware, this is why it doesn't have next()
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor
}