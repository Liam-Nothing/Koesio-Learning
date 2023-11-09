import { useState, useEffect } from 'react'
import './App.css'
import countriesService from './services/api'


const Display = ({ text }) => <div>{text}</div>
const api_key = import.meta.env.VITE_SOME_KEY
console.log(api_key);

function App() {

  const [countries, setcountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [weather, setWeather] = useState(null);

  const handleCountriesFilter = (event) => {
    const filterText = event.target.value.toLowerCase();
    const filtered = countries.filter((countrie) =>
      countrie.name.common.toLowerCase().includes(filterText)
    );
    setFilteredCountries(filtered);
  };
  
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      countriesService.getWeatherByCity(country.capital, api_key)
        .then(weatherData => {
          setWeather(weatherData);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [filteredCountries]); // Effect will re-run if filteredCountries changes



  const CountriesCases = (event) => {
    // console.log(filteredCountries.length);

    if (filteredCountries.length === 1) {

      return (
        filteredCountries.map(country => (
          <div key={country.name.common}>
            <div>
              <h1>{country.name.common}</h1>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
              <h2>Languages</h2>
              <ul>
                {Object.values(country.languages).map((language, i) => (
                  <li key={i}>{language}</li>
                ))}
              </ul>
              <img src={country.flags.png} alt="flag" width="150" height="100"/>
            </div>
            <div>
            {weather && (
              <div>
                <p><b>Weather in {country.capital}:</b></p>
                <p>{weather.weather[0].main}</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather" width="200" height="200"/>
              </div>
            )}
          </div>
          </div>
        ))

      )
    }else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return (
        filteredCountries.map(countries => (
          <div key={countries.name.common}>
            {countries.name.common}
            {/* <button onClick={CountriesCases}>show</button> */}
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
        // console.log(countries);
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
