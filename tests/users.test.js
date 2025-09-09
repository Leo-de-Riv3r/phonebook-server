// const { test, beforeEach, describe } = require('node:test')
// const helper = require('./test_helper')
// const User = require('../models/user')
// const app = require('../index')
// const supertest = require('supertest')
// const assert = require('node:assert')
// const api = supertest(app)

// describe('when there is only one user in db', () => {
//   beforeEach(async () => {
//     await User.deleteMany()
//     const user = new User({ name: 'John', email: 'john@example.com', password: 'password123' })
//     await user.save()
//     })
//   test('should create a new user successfully', async () => {
//     const usersAtStart = await helper.usersInDb()
//     const newUser = {
//       username: 'mluukkai',
//       name: 'Matti Luukkainen',
//       password: 'salainen',
//     }

//     await api
//     .post('/api/users')
//     .send(newUser)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//     const usersAtEnd = await helper.usersInDb()
//     assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

//     const usernames = usersAtEnd.map(u => u.username)
//     assert(usernames.includes(newUser.username))
//   })
// })