const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: {
    type : String,
    required : true,
    minLength : [3, 'Name must be at least 3 characters long']
  },
  phone : {
    type : String,
    required : true,
    minLegth : [5, 'Phone number must be at least 5 numbers length'],
    validate: {
      validator: function (v) {
        // ^ inicio, \d{2,3} = 2 o 3 dígitos, - guion, \d+ = uno o más dígitos, $ fin
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid format`
    },
  },
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Contact', contactSchema)