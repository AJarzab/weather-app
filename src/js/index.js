import "../style/style.scss";
import axios from 'axios';
require('dotenv').config()

const secret_key = process.env.APIKEY
const formEl = document.getElementById('form');
const cityInputEl = document.getElementById('city-input');
const iconMap = {
  'clear sky': 'sun',
  'few clouds': 'cloud-sun',
  'scattered clouds': 'cloud',
  'broken clouds': 'cloud',
  'shower rain': 'cloud-rain',
  'rain': 'cloud-showers-heavy',
  'thunderstorm': 'bolt',
  'snow': 'snowflake',
  'mist': 'smog',
};

const fetchWeatherData = (location) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${secret_key}`)
      .then((response) => {
        // handle success
        const weatherData = response.data;
        console.log(weatherData);
        updateUI(weatherData)
      })
      .catch((error) => {
        // handle error
        console.error(error);
      });
  };


const updateUI = (weatherData) => {
    const forecastEl = document.getElementById('weather-info');

    const temperatureCelsius = Math.round(weatherData.main.temp - 273.15)
    const description = weatherData.weather[0].description
    const firstLetterUppercase = description[0].toUpperCase() + description.slice(1)
    const iconClass = iconMap[weatherData.weather[0].main.toLowerCase()]
    const windSpeed = weatherData.wind.speed

    forecastEl.innerHTML = `
    <i id="temperature-icon" class="fas fa-${iconClass}"></i>
    <h2>${firstLetterUppercase}</h2>
    <h3>${weatherData.name}, ${weatherData.sys.country}</h2>
    <p class="temperature">${temperatureCelsius}°C</p>
    `
    
    const forecastDetailEl = document.getElementById('weather-details')

    const feelsLikeCelcius = Math.round(weatherData.main.feels_like - 273.15)

    forecastDetailEl.innerHTML = `
    <h3>Feels like </h3>
    <p class="weather-details-info">${feelsLikeCelcius}°C<p>
    <h3>Humidity</h3>
    <p class="weather-details-info">${weatherData.main.humidity}%</p>
    <h3>Wind Speed</h3>
    <p class="weather-details-info">${windSpeed}km/h
    `
  };
  



formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityInputEl.value;
    fetchWeatherData(city);
  });