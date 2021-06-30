const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('CONNECTING TO : >', url, '<')

mongoose
    .connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
    .then(result => console.log('CONNECTED TO MongDB'))
    .catch((error) => console.log('ERROR CONNECTING TO MongoDB: ', error.message, error))


const personSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    number: {type: String, required: true, minlength: 8},
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Person', personSchema)