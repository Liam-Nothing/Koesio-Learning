import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getWeatherByCity = (city, apiKey) => {
  const urlWithParams = `${weatherURL}?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(apiKey)}`;
  return axios.get(urlWithParams).then(response => response.data);
};

export default { getAll, getWeatherByCity }