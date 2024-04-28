const APIKey = "a3e186e4a56014719e5a6ea51beac8cc";

const input = document.querySelector(".block__input");
const button = document.querySelector(".button");
const weatherInformation = document.querySelector(".block__weather-information");
let valueInputCity;

const fetchData = async () => {
   try {

        if (!isNaN(valueInputCity)) {
            throw new Error("Please enter a valid city name");
        }

        const link = 
        `https://api.openweathermap.org/data/2.5/weather?q=${valueInputCity}&appid=${APIKey}`;
        const result = await fetch(link);

        if (!result.ok) {
            throw new Error(`Failed to fetch data. Status: ${result.status}`);
        }

        const data = await result.json();
        console.log(data);

        const { main, wind, weather } = data;

        
        const iconId = weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconId}.png`;


        weatherInformation.innerHTML = `
            <h1 class="weatherInformationH">${valueInputCity}</h1>
            <img src=${iconUrl} alt="Weather Icon" class="weather-icon"/>          
            <p class="weatherInformationP">Температура: ${main.temp} K</p>
            <p class="weatherInformationP">Вологість: ${main.humidity} %</p>
            <p class="weatherInformationP">Швидкість вітру: ${wind.speed} m/s</p>
        `;
   } catch (error) {
    console.error("Error fetching data:",error, error.code);
    
   } 
}

button.addEventListener("click", () => {
    valueInputCity = input.value;
    fetchData();
});

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        valueInputCity = input.value;
        fetchData(); 
    }
});
