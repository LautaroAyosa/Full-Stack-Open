import React from 'react'
import Country from './Country/Country';
import SingleCountry from './SingleCountry/SingleCountry'

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
            { filteredData.length > 10 ? 
                "Too many matches, please be more specific" :
                filteredData.length === 1 ?
                    <SingleCountry country={filteredData[0]} /> :
                    filteredData.map( (country, i) => {
                        return <Country key={i} country={country} />
                    })
            }
        </ul>
        
    );
}

export default Countries;
