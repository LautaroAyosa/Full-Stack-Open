import React, { useState } from 'react'
import SingleCountry from '../SingleCountry/SingleCountry';

function Country(props) {
    const [ isOpen, setIsOpen ] = useState(false);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <li style={{display: "flex", margin: "10px 5px"}}>
            <button onClick={handleClick} style={{maxHeight: "28px", width: "48px", marginRight: "10px"}}>{isOpen ? "Hide" : "Show"}</button>
            { isOpen ? 
                <SingleCountry country={props.country} />
                : <p>{props.country.name}</p> 
            }
        </li>
    );
}

export default Country;
