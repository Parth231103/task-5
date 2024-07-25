const apiKey = '1c58468f83a6663a3e388aceb02a3f34';

document.addEventListener('DOMContentLoaded', (event) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById('weather').innerHTML = "Geolocation is not supported by this browser.";
    }
});

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherByCoords(lat, lon);
}

function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherByLocation(location);
    }
}

function fetchWeatherByLocation(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error:', error));
}

function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error:', error));
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    if (data.cod === 200) {
        const weather = `
            <h2>${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        weatherDiv.innerHTML = weather;
    } else {
        weatherDiv.innerHTML = `<p>${data.message}</p>`;
    }
}
