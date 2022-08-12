import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Persons from './Components/Persons/Persons';
import Filter from './Components/Filter/Filter';
import PersonForm from './Components/PersonForm/PersonForm';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  },[])

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

        // POST new Person to the db
        axios
          .post('http://localhost:3001/persons', {
          name: newName,
          number: newNumber
        }).then ((response) => {
          setPersons(persons.concat(response.data));
        });
        
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
      <h2>Phonebook</h2>
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