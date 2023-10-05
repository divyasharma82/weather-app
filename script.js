// Define API key and API URL for OpenWeatherMap
const API_KEY = 'Your API key';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

// Get references to HTML elements
const temp = document.querySelector('.temp');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherIcon = document.querySelector('.weather-icon');
const container = document.querySelector('.weather');
const error = document.querySelector('.error');

const inputCityName = document.querySelector('.search input');
const btn = document.querySelector('.search button');

// Add a click event listener to the search button
btn.addEventListener('click', () => {
  const cityName = inputCityName.value.trim(); // Trim any leading/trailing spaces
  if (cityName) {
    fetchWeatherData(cityName); // Call the function to fetch weather data
  } else {
    // Handle empty input error here
    console.log('Please enter a city name.');
  }
});

// Function to fetch weather data from the API
async function fetchWeatherData(cityName) {
  try {
    const response = await fetch(`${API_URL}&q=${cityName}&appid=${API_KEY}`);

    // Check if the response is successful (HTTP status code 200)
    if (response.ok) {
      error.style.display = 'none';

      // Parse the response JSON data
      const data = await response.json();

      // Update HTML elements with weather information
      city.innerHTML = data.name;
      temp.innerHTML = Math.round(data.main.temp) + '°C';
      humidity.innerHTML = data.main.humidity + '%';
      wind.innerHTML = data.wind.speed + ' Km/h';

      // Update weather icon based on weather condition
      updateWeatherIcon(data.weather[0].main);

      // Display the weather container
      container.style.display = 'block';
    } else {
      // Handle API request error here
      error.style.display = 'block';
      error.container.display = 'none';
      console.error('Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Function to update the weather icon
function updateWeatherIcon(weatherCondition) {
  switch (weatherCondition) {
    case 'Clouds':
      weatherIcon.src = 'images/clouds.png';
      break;
    case 'Clear':
      weatherIcon.src = 'images/clear.png';
      break;
    case 'Rain':
      weatherIcon.src = 'images/rain.png';
      break;
    case 'Drizzle':
      weatherIcon.src = 'images/drizzle.png';
      break;
    case 'Mist':
      weatherIcon.src = 'images/mist.png';
      break;
    default:
      // Use a default icon or handle other conditions as needed
      break;
  }
}
