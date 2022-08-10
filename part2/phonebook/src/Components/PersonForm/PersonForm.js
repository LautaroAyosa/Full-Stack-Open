import React from 'react';

const PersonForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>Name: <input onChange={props.handleNameChange} value={props.newName} /></div>
            <div>Number: <input onChange={props.handleNumberChange} value={props.newNumber} /></div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;