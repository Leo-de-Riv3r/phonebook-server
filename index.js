//--test-concurrency=1 to test without concurrency issues
require('express-async-errors')
const morgan = require('morgan');
const cors = require('cors');
//para manejar errores asincronos sin usar try/catch
const express = require('express')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const contactsRouter = require('./controllers/contacts')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { dbName: "phonebook" })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors());
//permite recibir datos en formato json
app.use(express.json())
// Usar morgan en modo 'dev' (colores y detalles resumidos)
app.use(morgan('tiny'));
app.use(express.static('dist'))

app.use(middleware.requestLogger)
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}


app.use(middleware.tokenExtractor)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

//super important to test the app
module.exports = app