const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  //establece que el token expira en 1 hora
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })
  return res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
