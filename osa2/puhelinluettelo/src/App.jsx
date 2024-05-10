import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons.js'
import './index.css'


const FilterNames = ({filterV, onFC}) => {
  return (
    <form>
      <div>
        filter shown with: <input value = {filterV} onChange = {onFC}/>
      </div>
    </form>
  )
}

const Forms = ({newName, newNumber, handleNameChange, handleNumberChange, addPerson}) => {
  return (
    <div>
      <h2>add a new</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value = {newName} onChange = {handleNameChange}/>
          </div>
          <div>
            number: <input value = {newNumber} onChange = {handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    </div>  
  )
}

const Numbers = ({filterValue, persons, handleDel}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.includes(filterValue))
        .map(person =>
        <div key={person.id}>
          <li> {person.name} {person.number}</li>
          <button onClick={() => handleDel(person.name, person.id)}>delete</button>
        </div>
        )}
      </ul>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  let error;
  if (message.startsWith("Deleted")) {
    error = "error";
  } else if (message.startsWith("Information")) {
    error = "error2";
  }

  return (
    <div className={error}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleDel = (name, id) => {
    if (window.confirm(`Do you really want to delete ${name}`)) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
      })
      .then(error => {
        setNotificationMessage(
          `Deleted ${name}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (!persons.map(person => person.name).includes(nameObject.name)) {
      personService
        .create(nameObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
      })
      .then(thing => {
        setNotificationMessage(
          `Added ${nameObject.name}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 1000)
      })
      console.log(persons)
    } else {
      const updatedPerson = {
        name: newName,
        number: newNumber,
        id: (persons.find(n => n.name === nameObject.name).id)
      }

      if (window.confirm(`Do you want to change the number of ${updatedPerson.name}`)) {
        persons.forEach(n => console.log(n.name))
        personService
        .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            console.log(returnedPerson.number)
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setNotificationMessage(
            `Information of ${nameObject.name} has already been removed from the server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
      }
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <FilterNames filterV={filterValue} onFC={handleFilterChange}/>
      <Forms newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <Numbers persons={persons} filterValue={filterValue} handleDel={handleDel}/>
    </div>
  )

}

export default App