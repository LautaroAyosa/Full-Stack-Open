import React from 'react';
import phonebookService from '../../../services/phonebook'

const Person = (props) => {

    

    return (
        <li>{props.name} - {props.number} <button onClick={props.handleRemove} value={props.id} >Remove</button></li>
    )
}

export default Person;