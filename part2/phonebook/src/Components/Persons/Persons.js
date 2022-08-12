import React from 'react';
import Person from './Person/Person';

const Persons = (props) => {

    const filteredData = props.persons.filter((e) => {
        let numberFilter = Number.parseInt(props.filter);
        let isInteger = Number.isInteger(numberFilter);
        if (props.filter === "" ) {
            // If the field is empty, return all
            return e;
        } else if ( isInteger ) {
            // If the input is a Number, filter by name.
            return e.number.includes(props.filter);
        } else {
            // Else, filter by name
            var lowerCase = props.filter.toLowerCase();
            return e.name.toLowerCase().includes(lowerCase);
        }
    })


    return (
        <ul>
            {filteredData.map((person, i) => <Person key={i} name={person.name} number={person.number} />)}
        </ul>
    )
}

export default Persons;