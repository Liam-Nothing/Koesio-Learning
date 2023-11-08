import { useState, useEffect } from 'react'
import './App.css'
import countriesService from './services/api'


const Display = ({ text }) => <div>{text}</div>

function App() {

  const [countries, setcountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleCountriesFilter = (event) => {
    const filterText = event.target.value.toLowerCase();
    const filtered = countries.filter((countrie) =>
      countrie.name.common.toLowerCase().includes(filterText)
    );
    setFilteredCountries(filtered);
  };
  
  const CountriesCases = (event) => {
    console.log(filteredCountries.length);

    if (filteredCountries.length === 1) {
      return (
        filteredCountries.map(countries => (
          <div key={countries.name.common}>
            <h1>{countries.name.common}</h1>
            <p>Capital: {countries.capital}</p>
            <p>Population: {countries.population}</p>
            <h2>Languages</h2>
            <ul>
              {Object.values(countries.languages).map((language, i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
            <img src={countries.flags.png} alt="flag" width="150" height="100"/>
          </div>
        ))
      )
    }else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return (
        filteredCountries.map(countries => (
          <div key={countries.name.common}>
            {countries.name.common}
          </div>
        ))
      )
    }else if (filteredCountries.length > 10) {
      return (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    }else{
      return (
        <div>
          <p>No country found</p>
        </div>
      )
    }

  };

  useEffect(() => {
    countriesService
    .getAll()
    .then(countries => {
        setcountries(countries);
        console.log(countries);
    });
  }, []);

  return (
    <div>
      <input onKeyUp={handleCountriesFilter} />
      <CountriesCases/>
    </div>
  )
}

export default App
