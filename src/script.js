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
date.innerHTML =  (`${month} ${now.getDate()}`);

let time = document.querySelector("#time");
time.innerHTML = (`${now.getHours()}:${now.getMinutes()}`);

day = document.querySelector("#day");
day.innerHTML = days[now.getDay()];


//integrating weather API