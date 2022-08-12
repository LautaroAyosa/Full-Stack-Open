import React from 'react'
import Country from './Country/Country';

function Countries(props) {

    const filteredData = props.countries.filter((e) => {
        
        if (props.filter === "" ) {
            // If the field is empty, return all
            return e;
        } else {
            // Else, filter by name
            var lowerCase = props.filter.toLowerCase();
            return e.name.toLowerCase().includes(lowerCase);
        }
    })

    return (
        <ul>
            { filteredData.length <= 10 ? 
                filteredData.map( (country, i) => {
                return <Country key={i} country={country} />
                }) : "Too many matches, please be more specific"
            }
        </ul>
        
    );
}

export default Countries;
