const Contact = require('../models/contact')
const User = require('../models/user')

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

const nonExistingId = async () => {
  const contact = new Contact({ name: 'willremovethissoon', phone: '123-4567890' })
  await contact.save()
  await contact.deleteOne()
  return contact._id.toString()
}

const contactsInDb = async () => {
  const contacts = await Contact.find({})
  return contacts.map(contact => contact.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialContacts,
  nonExistingId,
  contactsInDb,
  usersInDb
}
