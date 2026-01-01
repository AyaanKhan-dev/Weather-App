const apiKey = "75ce7da7304b3c0e0b2db3df4f119be0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".searchBtn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherBox = document.querySelector(".weather");

const clickSound = document.getElementById("clickSound");
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
        alert("City not found");
        return;
    }

    const data = await response.json();

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
    document.querySelector(".feels").innerText = Math.round(data.main.feels_like) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".pressure").innerText = data.main.pressure + " hPa";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";
    document.querySelector(".visibility").innerText = data.visibility / 1000 + " km";

    const condition = data.weather[0].main;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const currentTime = Math.floor(Date.now() / 1000);

    const isDay = currentTime >= sunrise && currentTime < sunset;

    if (condition === "Clear") {
        weatherIcon.src = isDay ? "Images/clear.png" : "Images/moon-clear.png";
    }
    else if (condition === "Mist") {
        weatherIcon.src = isDay ? "Images/mist-day.png" : "Images/moon-mist.png";
    }
    else if (condition === "Clouds") {
        weatherIcon.src = "Images/cloudy.png";
    }
    else if (condition === "Rain") {
        weatherIcon.src = "Images/rain.png";
    }
    else if (condition === "Drizzle") {
        weatherIcon.src = "Images/drizzle.png";
    }

    weatherBox.style.display = "block";
}

searchBtn.addEventListener("click", () => {
    playClickSound();
    checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        playClickSound();
        checkWeather(searchBox.value.trim());
    }
});

document.addEventListener("keydown", (e) => {
    if (/^[a-zA-Z]$/.test(e.key)) {
        typeSound.currentTime = 0;
        typeSound.play();
    }
});