const key = "d1795c1a58faa387be18723d89beeedc";

const clickButton = () => {
    const city = document.querySelector(".input-town").value 
    console.log(city)

    searchCity(city)
};

function dataOnScreen(data) {
    console.log(data)
    document.querySelector(".city-weather").innerHTML = "Tempo em " + data.name
    document.querySelector(".temperature").innerHTML = Math.floor(data.main.temp) + "°C"
    document.querySelector(".text-weather-prevision").innerHTML = data.weather[0].description
    document.querySelector(".moisture").innerHTML = data.main.humidity + "%"
    document.querySelector(".img-weather-prevision").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
 };

async function searchCity (city){

const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`).then(answer=>answer.json())

dataOnScreen(data)
};

