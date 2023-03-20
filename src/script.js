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

function getTemp(response) {
  console.log(response);
  let temp = Math.round(response.data.temperature.current);
  let humidity = document.querySelector("#humidity")
  let location = document.querySelector("#city");
  let city = response.data.city;
  let cityTemp = document.querySelector("#temp");
  let condition = document.querySelector("#description");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", response.data.condition.icon_url);
  condition.innerHTML = response.data.condition.description.toUpperCase();
  humidity.innerHTML = response.data.temperature.humidity;
  cityTemp.innerHTML = `${temp}°`;
  location.innerHTML = city;
 wind.innerHTML = Math.round(response.data.wind.speed);
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




let form = document.querySelector("form");
form.addEventListener("submit", changeCity);