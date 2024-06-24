const apikey = 'bce7c2595841e4e6cbc08dcf6b173957';
const className = [];

document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherByLocation, handleLocationError);
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
});

document.getElementById('searchButton').addEventListener('click', function () {
    var city = document.getElementById('city').value;
    className.length = 0;
    fetchWeatherByCity(city);
    document.getElementById('city').value = '';  
});

document.getElementById('locateButton').addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherByLocation, handleLocationError);
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
});

function fetchWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
        .then((res) => res.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            console.error('Error fetching location data:', error);
        });
}

function fetchWeatherByLocation(position) {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`)
        .then((res) => res.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            console.error('Error fetching location data:', error);
        });
}

function displayWeather(data) {
    if (data.cod === 200) {
        const location = data;
        console.log(location.name);
        console.log((location.main.temp - 273.15).toFixed(0) + '°C');
        console.log(location.weather[0].main);
        console.log(location.weather[0].description);
        console.log(location.weather[0].icon);
        const pngName = location.weather[0].icon.slice(-1);
        if (pngName === 'd') {
            className.push('day');
        } else {
            className.push('night');
        }
        console.log(className);
        document.getElementById('text').innerHTML = `
            <h2>${location.name}</h2>
            <div class=flex-part>
            <div class='temp-img'>
            <i class="bi bi-${getWeatherIcon(location.weather[0].main)} |"></i>
            <p>| ${(location.main.temp - 273.15).toFixed(0)} °C</p>
            </div>
            <div class='weather'>
            <h3>Weather</h3>
            <p>${location.weather[0].main}</p>
            <p>${location.weather[0].description}</p>
            </div>
            </div>
        `;
        const tempZone = document.getElementById('temp-zone');
        tempZone.classList.remove('day', 'night');
        tempZone.classList.add(className[0]);
    } else {
        alert('No data found for the given city');
    }
}

function getWeatherIcon(weather) {
    switch (weather.toLowerCase()) {
        case 'clear':
            return 'sun';
        case 'clouds':
            return 'cloud';
        case 'rain':
            return 'cloud-rain';
        case 'snow':
            return 'cloud-snow';
        case 'thunderstorm':
            return 'cloud-lightning';
    }
}

function handleLocationError(error) {
    console.error('Error fetching location data:', error);
}
