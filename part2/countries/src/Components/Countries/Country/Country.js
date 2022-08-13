import React, { useState } from 'react'
import SingleCountry from '../SingleCountry/SingleCountry';

function Country(props) {
    const [ isOpen, setIsOpen ] = useState(false);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <li styles="display: flex;">
        <button onClick={handleClick}>{isOpen ? "Hide" : "Show"}</button>
        { isOpen ? 
            <SingleCountry country={props.country} />
            : <p>{props.country.name}</p> 
        }
        </li>
    );
}

export default Country;
