import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Filter from './Components/Filter/Filter';
import Countries from './Components/Countries/Countries';

function App() {
  const [ filter, setFilter ] = useState("");
  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {        
          setCountries(response.data);
      })
  },[filter])

  return (
    <div >
      <Filter label="Find Countries" filter={filter} setFilter={setFilter} />
      <Countries countries={countries} filter={filter} />
    </div>
  );
}

export default App;
