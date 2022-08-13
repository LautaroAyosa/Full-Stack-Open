import React, {useEffect, useState} from 'react'
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

function SingleCountry(props) {
    const [ weather, setWeather ] = useState([]);
    const direction = ['North','North East', 'East','South East', 'South','South West', 'West','North west'];

    useEffect(() => {
        if (props.country.capital) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.country.capital}&appid=${apiKey}`)
                .then( response => {
                    setWeather(response.data);
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        <div>
            <div>
                <h2>{props.country.name}</h2>
                <p>Capital City: { props.country.capital ? props.country.capital : "Could not found the Capital city of this country"}</p>
                <p>Population: {props.country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                <h3>Languages</h3>
                <ul>{ props.country.languages.map( (language, i) => {
                    return <li key={i}>{language.name}</li>
                })}</ul>
                <br/>
                <img src={props.country.flag} alt={`${props.country.demonym} flag`} width="200px" />
            </div>
                { weather.length !== 0 ? 
                    <div>
                        <h3>Weather in {props.country.capital}</h3>
                        <p style={{display: "flex", alignItems: "center", textTransform: "capitalize"}}><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" /> {weather.weather[0].description}</p>
                        <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
                        <h4>Wind: </h4>
                        <p>Speed: { Math.round(weather.wind.speed * 3.6)} km/h</p>
                        <p>Direction: {direction[Math.floor(((weather.wind.deg+22.5)%360)/45)]}</p>
                    </div> : props.country.capital ? <p>Loading Weather...</p> : <p>Can not load weather, there is no capital city</p>

                }
                
            
        </div>
    );
}

export default SingleCountry;
