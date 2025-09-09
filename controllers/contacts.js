//TEST THIS FILE
const contactsRouter = require('express').Router();
const Contact = require('../models/contact');
const middleware = require('../utils/middleware');

contactsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const contact = new Contact({
    name: body.name,
    phone: body.phone,
    user: user._id
  })

  const savedContact = await contact.save()
  user.contacts = user.contacts.concat(savedContact._id)
  await user.save()
  response.status(201).json(savedContact)
})

contactsRouter.put('/:id', middleware.userExtractor, async (req, res) => {
  const body = req.body;
  const user = req.user;
  const contact = {
    name: body.name,
    phone: body.phone,
    user: user._id
  }

  const existingContact = await Contact.findById(req.params.id);

  if(!existingContact) {
    return req.status(404).json({ error: 'Contact not found' }).end()
  }

  if (existingContact || existingContact.user._id.toString() === user._id.toString()) {
    const updated = await Contact.findByIdAndUpdate(req.params.id, contact, { new: true, runValidators: true, context: 'query' })
    user.contacts = user.contacts.map(c => c.name === updated.name ? updated : c);
    await user.save()
    res.status(200).json(updated)
  } else {
    return res.status(403).json({ error: 'you do not have permission to update this' })
  }
})


contactsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const user = req.user;
  const contact = await Contact.findById(req.params.id);
  if (!contact || contact.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: 'you do not have permission to delete this contact' });
  } else {
    const deleted = await Contact.findByIdAndDelete(req.params.id)
    user.contacts = user.contacts.filter(c => c !== deleted)
    await user.save()
    res.status(200).json(deleted).end()
  }
})

contactsRouter.get('/', async (req, res) => {
  const contacts = await Contact.find({}).populate('user', { username: 1, name: 1 })
  res.json(contacts)
})

contactsRouter.get('/:id', async (request, response) => {
  const result = await Contact.findById(request.params.id)
  if (result) {
    response.json(result)
  } else {
    response.status(404).end()
  }
})


module.exports = contactsRouter;
