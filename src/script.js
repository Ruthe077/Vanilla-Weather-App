//set current date and time

let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = (months[now.getMonth()]);

let date = document.querySelector("#date");
date.innerHTML =  (`${month.toUpperCase()} ${now.getDate()}`);

let time = document.querySelector("#time");
time.innerHTML = (`${now.getHours()}:${now.getMinutes()}`);

day = document.querySelector("#day");
day.innerHTML = days[now.getDay()].toUpperCase();


//integrating weather API
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];

}

function displayForecast(response) {
    console.log(response.data.daily);
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
  
    let forecastHTML = `<div class="row">`;
   
    forecast.forEach(function(forecastDay, index) {
        let tempmax = Math.round(forecastDay.temperature.maximum);
        let tempmin = Math.round(forecastDay.temperature.minimum);
        let img = forecastDay.condition.icon_url;

        if (index < 6 && index > 0) {
        forecastHTML = forecastHTML + ` <div class="col">
          <div class="day">${formatDay(forecastDay.time)}</div>
          <div class="weathericon">
          <img src=${img} id="weathericon" width="50%"/>
          </div>
          <span class="temp-line">
          <span class="temp-max">${tempmax}° </span>
          <span class="temp-min">  ${tempmin}°</span>
          </span>
          </div>
          `;
        }
    });
    

      forecastHTML = forecastHTML + `</div>`;
      
    forecastElement.innerHTML = forecastHTML;
  
}

function getForecast(coordinates) {
 console.log(coordinates);
 let lon = coordinates.longitude;
 let lat = coordinates.latitude;
 let apiKey = "3at2b7b503ccbeb5e43637ffc4ae05oa";
let url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
console.log(url);
axios.get(url).then(displayForecast);
}

function getTemp(response) {
  console.log(response);
  celciusTemp = Math.round(response.data.temperature.current);
  let humidity = document.querySelector("#humidity")
  let location = document.querySelector("#city");
  let cityTemp = document.querySelector("#temp");
  let city = response.data.city;
  let condition = document.querySelector("#description");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", response.data.condition.icon_url);
  condition.innerHTML = response.data.condition.description.toUpperCase();
  humidity.innerHTML = response.data.temperature.humidity;
  cityTemp.innerHTML = `${celciusTemp}°`;
  location.innerHTML = city;
 wind.innerHTML = Math.round(response.data.wind.speed);

 getForecast(response.data.coordinates);
}


function changeCity(event) {
  event.preventDefault();
  let apiKey = "3at2b7b503ccbeb5e43637ffc4ae05oa";
  let unit = "units=metric";
  let city = document.querySelector("#city-input");
  city = (city.value);
  let url = "https://api.shecodes.io/weather/v1/current?query=";
  axios.get(`${url}${city}&key=${apiKey}&${unit}`).then(getTemp);
}

function convertCelcius(event) {
    event.preventDefault();
    fahrenheitButton.classList.remove("active");
    celciusButton.classList.add("active");
    let cityTemp = document.querySelector("#temp");
    cityTemp.innerHTML = `${celciusTemp}°`;
}

function convertFahrenheit(event) {
    event.preventDefault();
    celciusButton.classList.remove("active");
    fahrenheitButton.classList.add("active");
    let cityTemp = document.querySelector("#temp");
   let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
   cityTemp.innerHTML = `${Math.round(fahrenheitTemp)}°`;
}




let celciusTemp = null;

let celciusButton = document.querySelector("#celcius");
celciusButton.addEventListener("click", convertCelcius);

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", convertFahrenheit);

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);