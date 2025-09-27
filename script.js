let api_key = "09e1812c889c823beb76d7e674c3f741";

let input = document.querySelector('.input-val');

let btn = document.querySelector('button')

let city = document.querySelector('.city');

let getDataDIv = document.querySelector('.get-data')

let temperature = document.querySelector('.temperature');

let windSpeed = document.querySelector('.wind-speed');

let weather = document.querySelector('.weather');

let country = document.querySelector('.country')

let errorMessage = document.querySelector('.error')

let humidity = document.querySelector('.humidity')

const regex = /^[a-zA-Z\s]+$/;

function inputValidate(userVal) {
    if (userVal === "" || !regex.test(userVal)) {
        errorMessage.style.display = "block"
    }
    else {
        errorMessage.style.display = "none"
        getWeather(userVal)
    }
}

function getInput() {
    btn.addEventListener('click', (e) => {
        let inputVal = input.value
        inputValidate(inputVal)
    })
}

getInput()

async function getWeather(cityName) {
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`)
    if (!data.ok) {
        if (data.status === 404) {
            errorMessage.textContent = `City not found`
            errorMessage.style.display = "block"
        }
    }
    else {
        let raw = await data.json()
        await updateWeather(raw)
    }
}

async function updateWeather(current) {
    let currentHumidity = await current['main']['humidity']
    humidity.textContent = await currentHumidity
    let currentWeather = await current['weather'][0]
    let currentWeatherDescription = await currentWeather.description
    errorMessage.textContent = current['message']
    errorMessage.style.display = "block"
    let currentCityName = await current['name']
    let currentCountryName = await current['sys']['country']
    let currentTemp = await current['main']['temp']
    city.textContent = `${currentCityName},`;
    country.textContent = await currentCountryName
    temperature.innerHTML = `${currentTemp} <sup>o</sup>C`
    let currentWindSpeed = await current['wind']['speed']
    weather.textContent = await currentWeatherDescription
    windSpeed.textContent = `${currentWindSpeed} m/s`
    getDataDIv.style.display = "block"
}