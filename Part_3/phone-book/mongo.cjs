const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb://merelytimo_db_user:${password}@ac-zvnk5hi-shard-00-00.iefovat.mongodb.net:27017,ac-zvnk5hi-shard-00-01.iefovat.mongodb.net:27017,ac-zvnk5hi-shard-00-02.iefovat.mongodb.net:27017/phoneBookApp?ssl=true&replicaSet=atlas-birpmt-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {

  console.log("\nPhone Book:\n")

  Person.find({}).then(persons => {
    // console.log(persons)
    /*persons.forEach(person => {
      console.log(person)
    })*/
    persons.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    // console.log('\n')
    mongoose.connection.close().then(console.log("\nclosed the connection"))
    process.exit(0)
  })

} else if (process.argv.length < 5 ) {

  console.log("Give a number as an argument")
  mongoose.connection.close()
  process.exit(1)

} else {

  const person = new Person({
    name: name || "no name",
    number: number || "no number",
    id: String(Math.floor(Math.random() * 1000))
  })

  console.log('id: ' + String(Math.floor(Math.random() * 1000)))

  person.save().then(result => {
    console.log('number successfully saved!' )
    mongoose.connection.close()
  })

}