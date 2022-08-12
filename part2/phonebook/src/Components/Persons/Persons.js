import React from 'react';

const Persons = (props) => {

    const filteredData = props.persons.filter((e) => {
        if (props.filter === "" ) {
            return e;
        } else {
            var lowerCase = props.filter.toLowerCase();
            return e.name.toLowerCase().includes(lowerCase);
        }
    })


    return (
        <ul>
            {filteredData.map((person, i) => <li key={i}>{person.name} {person.number}</li>)}
        </ul>
    )
}

export default Persons;