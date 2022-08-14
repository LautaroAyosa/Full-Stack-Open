import React, { useState, useEffect } from 'react';

// Services
import phonebookService from './services/phonebook';

import Persons from './Components/Persons/Persons';
import Filter from './Components/Filter/Filter';
import PersonForm from './Components/PersonForm/PersonForm';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data);
      })
  },[])

  // Submit Handler
  function handleSubmit(e) {
    e.preventDefault();
    
    // If the name or the number are empty, send an Alert
    if (newName !== "" && newNumber !== "") {
      
      // Verify if the name is already in the phonebook
      if ( persons.some(person => person.name.toLowerCase() === newName.toLowerCase())  ) {
        if (window.confirm(`The name: ${newName} is already on the PhoneBook, do you want to replace the old number with a new one?`)) {
          updatePerson(newName, newNumber)
        }
      } else {
        // POST new Person to the db
        phonebookService
          .createPerson(newName, newNumber)
          .then(response => {
            setPersons(persons.concat(response.data))
          })
        
      }
    } else {
      alert("You need to complete all values to be able to add it to the phonebook")
    }
  }

  function updatePerson (name, number) {
    const person = persons.filter(element => {
      return element.name.toLowerCase() === name.toLowerCase()
    })
    phonebookService
      .updatePerson(person[0].id, name, number)
      .then(() => {
        phonebookService
          .getAll()
          .then(response => {
            setPersons(response.data);
          })
        // Clear input Fields
        setNewName("");
        setNewNumber("");
      })
  }

  function handleRemove (e) {
    if (window.confirm("Do you really want to delete that number?")) {
      phonebookService
        .deletePerson(e.target.value)
        .then(response => {
          phonebookService
            .getAll()
            .then(response => {
              setPersons(response.data);
            })
        })
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
        persons={persons}
        handleRemove={handleRemove}
      />
    </div>
  )
}

export default App