let api_key = "09e1812c889c823beb76d7e674c3f741";

let input = document.querySelector('.input-val');

let btn = document.querySelector('button')

let city = document.querySelector('.city');

let temperature = document.querySelector('.temperature');

let windSpeed = document.querySelector('.wind-speed');

let weather = document.querySelector('.weather');

let country = document.querySelector('.country')

let errorMessage = document.querySelector('.error')
 
function inputValidate(userVal) {
    if(userVal === "" || !isNaN(userVal)) {
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
    let raw = await data.json()
    await updateWeather(raw)
}

async function updateWeather(current) {
    errorMessage.textContent = current['message']
    errorMessage.style.display = "block"
    let currentCityName = await current['name']
    let currentCountryName = await current['sys']['country']
    let currentTemp = await current['main']['temp']
    city.textContent = `${currentCityName},`;
    country.textContent = await currentCountryName
    temperature.textContent = await currentTemp
    let currentWindSpeed = await current['wind']['speed']
    windSpeed.textContent = await currentWindSpeed
}