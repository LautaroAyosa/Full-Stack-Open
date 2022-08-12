import React, { useState } from 'react';

import Persons from './Components/Persons/Persons';
import Filter from './Components/Filter/Filter';
import PersonForm from './Components/PersonForm/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('');

  // Submit Handler
  function handleSubmit(event) {
    event.preventDefault();
    // If the name or the number are empty, send an Alert
    if (newName !== "" && newNumber !== "") {
      // Verify if the value is already in the name or number is already in the phonebook
      if ( persons.some(person => person.name.toLowerCase() === newName.toLowerCase()) || persons.some(person => person.number.toLowerCase() === newNumber.toLowerCase()) ) {
        alert(`The name: ${newName} or the Number: ${newNumber} is already on the Phone Book`)
        // Clear input Fields
        setNewName("");
        setNewNumber("");
      } else {
        setPersons(persons.concat({
          name: newName,
          number: newNumber
        }));
        // Clear input Fields
        setNewName("");
        setNewNumber("");
      }
    } else {
      alert("You need to complete all values to be able to add it to the phonebook")
    }
  }

  // Change Handlers 
  function handleNameChange(event) {
    setNewName(event.target.value);
  }
  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }
  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        label={"Filter shown with"}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <div>
        <h3>Add a new number to the Phone Book</h3>
        <PersonForm 
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          handleSubmit={handleSubmit}
          newName={newName}
          newNumber={newNumber}
        />
      </div>
      <h3>Numbers</h3>
      <Persons 
        filter={filter}
        persons={persons} />
    </div>
  )
}

export default App