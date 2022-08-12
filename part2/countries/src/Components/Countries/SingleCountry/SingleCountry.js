import React from 'react'

function SingleCountry(props) {

    

    return (
        <div>
            <h2>{props.country.name}</h2>
            <p>Capital City: {props.country.capital}</p>
            <p>Population: {props.country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            <h3>Languages</h3>
            <ul>{ props.country.languages.map( (language, i) => {
                return <li key={i}>{language.name}</li>
            })}</ul>
            <br/>
            <img src={props.country.flag} alt={`${props.country.demonym} flag`} width="200px" />
        </div>
    );
}

export default SingleCountry;
