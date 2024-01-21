import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons.js'


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
        <div>
          <li key={person.name}> {person.name} {person.number}</li>
          <button key={person.id} onClick={handleDel}>delete</button>
        </div>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
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

  const handleDel = (event, id) => {
    event.preventDefault()
    setPersons(persons.filter(n => n.id !== id))
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (!persons.map(person => person.name).includes(nameObject.name)) {
      setPersons(persons.concat(nameObject))
      personService.create(nameObject)
      setNewName('')
      setNewNumber('')
      console.log(persons)
    } else {
      alert(`${nameObject.name} is already added to the phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterNames filterV={filterValue} onFC={handleFilterChange}/>
      <Forms newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <Numbers persons={persons} filterValue={filterValue} handleDel={handleDel}/>
    </div>
  )

}

export default App