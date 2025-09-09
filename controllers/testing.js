const testingRouter = require('express').Router()
const User = require('./../models/user')
const Contact = require('../models/contact')

testingRouter.post('/reset', async(req, res) => {
  await User.deleteMany({})
  await Contact.deleteMany({})
  res.status(204).end()
})

module.exports = testingRouter