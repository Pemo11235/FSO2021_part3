const mongoose = require('mongoose')

if (process.argv.length < 3 ) {
    console.log('Please insert password! ')
    process.exit(1)
}
if(process.argv.length ===4) {
    console.log('Please insert a phone number too! ')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]

const url = `mongodb+srv://admin:${password}@cluster0.xmxno.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose
    .connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

const personSchema = new mongoose.Schema({
    name: String,
    phone: Number
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('Phonebook: ')
    Person.find({}).then(
        persons =>
            persons.forEach(person => console.log('  ->', person.name, person.phone))
    ).then( () => mongoose.connection.close())
}

if (process.argv.length === 5) {

    const person = new Person(
        {
            name,
            phone,
        }
    )

    person.save().then(res => {
        console.log(`added ${name} number ${phone} to phonebook`);
        mongoose.connection.close()
    })
}