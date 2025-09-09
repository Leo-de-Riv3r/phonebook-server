const { test , after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const assert = require('node:assert')
const api = supertest(app)
const Contact = require('../models/contact')
const helper = require('./test_helper')

let initialContacts = [
  {
    name: 'bordo bablo',
    phone: '123-4567891011'
  },
  {
    name: 'eqeqeq',
    phone: '123-456789101112'
  }
]

// beforeEach(async () => {
//   await Contact.deleteMany({})
//   await Contact.insertMany(helper.initialContacts)
//   console.log('beforeEach: Contacts initialized')
// })

test.only('contacts are returned as json', async () => {
  console.log('Testing contacts API')
  await api
  .get('/api/contacts')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('all contacts are returned', async () => {
  const response = await api.get('/api/contacts')
  assert.strictEqual(response.body.length, initialContacts.length)
})

test('the first contact is bordo', async () => {
  const response = await api.get('/api/contacts')

  const name = response.body.map(e => e.name)
  assert(name.includes('bordo bablo'), 'Contact name bordo bablo should be present')
})

// test('contact without content is not added', async () => {
//   const newcontact = {
//   }

//   await api
//     .post('/api/contacts')
//     .send(newcontact)
//     .expect(400)

//   const response = await api.get('/api/contacts')

//   assert.strictEqual(response.body.length, initialContacts.length)
// })



after(async () => {
  await mongoose.connection.close()
})