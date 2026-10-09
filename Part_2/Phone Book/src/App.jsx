import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const Persons = ({persons, handleDeletePerson}) => {
  return(
    <>
      <ul style={{listStyleType: "none", padding: 0, margin: 0}}>
        {persons.map((person) => <li key={person.id}>{person.name} {person.number}&nbsp;
        <button onClick={() => handleDeletePerson(person.id)}>delete</button></li>)}
      </ul>
    </>
  )
}

const Filter = ({searchTerm, handleSearchChange}) => {
  // console.log(searchTerm)

  return (
    <div>Filter based on: <input value={searchTerm} onChange={handleSearchChange}/></div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {

    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')

  useEffect(() => {
    personService.getAll()
      .then((response) => {
        // console.log(response.data)
        setPersons(response.data)
      })
  }, [])

  const handleDeletePerson = (id) => {
    let passed = confirm("Are you sure you want to delete this entry?")
    if (passed) {
      console.log("User confirmed request")
      console.log("item id: " + id)
      const name = persons.filter(person => person.id === id)[0].name

      // ... call personService
      personService.deletePerson(id)
        .then((response) => {
          console.log(response)
          // console.log('status: ' + response.status)
          const newPersons = persons.filter(person => person.id !== id)
          setPersons(newPersons)
          setErrorMessage(`'${name}' was successfully deleted.`)
          setMessageType('message')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch((response) => {
          console.log("There was an error deleting the entry")
          console.log(response)
          if (response.status === 404) {
            setErrorMessage(`Information for ${name} has already been removed from server.`)
          } else {
            setErrorMessage(`There was a problem deleting '${name}'`)
          }
          setMessageType('error')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        
    } else {
      console.log("User rejected request")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const alreadyExists = persons.some((p) => p.name === newName)

    if (alreadyExists) {

      const confirmed = confirm(`${newName} already exists, replace the old number with a new one?`)

      if (confirmed) {
        //delete old entry ... 
        //actually recommended to use a put request
      
        //add the new name
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }

        //find the id
        const person = persons.find((p) => p.name === newName)
        const id = person.id

        console.log("id: " + id)
        console.log(person)

        personService.replace(personObject, id)
          .then(response => {
            console.log(response)
            // console.log("entry replaced")

            //exclude old entry and add new one
            let newPersons = persons.filter(person => person.id !== id)
            newPersons = newPersons.concat(personObject)
            setPersons(newPersons)

            setErrorMessage(`${newName} successfully replaced.`)
            setMessageType('message')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
          })
          .catch(response => {
            console.log(response)
            // console.log('problem replacing entry')
            setErrorMessage(`There was a problem replacing ${newName}.`)
            setMessageType('error')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
          })

        // reset fields on form
        setNewName('')
        setNewNumber('')
      }

    } else {
      //add the new name
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      // console.log('persons.length ' + persons.length)

      personService.create(personObject)
        .then(response => {
          console.log(response)
          setErrorMessage(`${newName} was successfully added.`)
          setMessageType('message')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.concat(personObject))
        })
        .catch(response => {
          console.log(response)
          setErrorMessage(`There was a problem adding ${newName}`)
          setMessageType('error')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })


      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={messageType}/>
      
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
      
      <h2>Add new:</h2>
      
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers:</h2>
      
      <Persons persons={personsToShow} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App