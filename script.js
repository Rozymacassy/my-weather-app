
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let forDate = date.getDate();
  let fullYear = date.getFullYear();

  let weekDays = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[weekDays];
  return `${day}, ${month} ${forDate} ${fullYear} ${hours}:${minutes}`;
}

function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;
console.log(response);
  forecast.forEach(function (forecastDay, index){
    if (index < 6){

      forecastHTML = forecastHTML + `
    
      <div class="col-2 day-weather ">
            <div class="weather-forecast-day">${forecastDate(forecastDay.time)}</div>
            <div class="weather-logo">
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"alt="Clear" id="weather-logo" class="weather-icon" />
           </div>
        <div class="weather-forecast-temp">
              <span class="weather-forecast-temp-max">
                  ${Math.round(forecastDay.temperature.maximum)}
              </span>⁰
              <span class="weather-forecast-temp-min">
              ${Math.round(forecastDay.temperature.minimum)}
              </span>⁰
         </div>
      </div>
    `;
    }

  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// function forecastDate(timestamp) {
//   let date = new Date(timestamp * 1000);
//   let day = date.getDay();
//   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return days[day];
// }

// function displayForecast(response) {
//   let forecast = response.data.daily;
//   let forecastElement = document.querySelector("#forecast");    
//   let forecastHTML = `<div class="row">`;

//   forecast.forEach((forecastDay, index) => {
//     if (index < 6) {
//       forecastHTML =
//         forecastHTML +
//         ` 
//                 <div class="col-2">
//                 <div class="weather-forecast-date">${forecastDate(
//                   forecastDay.time
//                 )}</div>
//                 <img
//                   src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
//                     forecastDay.condition.icon
//                   }.png"

//                   alt=""
//                   width="42"
//                 />

//                 <div class="weather-forecast-temps">
//                   <span class="weather-forecast-temp-max">${Math.round(
//                     forecastDay.temperature.maximum
//                   )}°</span>
//                   <span class="weather-forecast-temp-min">${Math.round(
//                     forecastDay.temperature.minimum
//                   )}°</span> 
//                 </div>
//               </div>

//     `;
//     }
//   });

//   forecastHTML = forecastHTML + `</div> `;
//   forecastElement.innerHTML = forecastHTML;
// }

function getForecast(coordinates) {
  let apiKey = "40838fb0aebe5a563a3bc60cbb4foaat"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feels = document.querySelector("#feels_like");
  let pressure = document.querySelector("#pressure");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  // let weatherIcon = document.querySeleector("#weather-logo");
  let currentTime = new Date();

  celsiusTemperature = response.data.temperature.current;

  // celsiusTemperature = response.data.main.temp;
  pressure.innerHTML = Math.round(response.data.temperature.pressure);
  feels.innerHTML = Math.round(response.data.temperature.feels_like);
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(currentTime);
  // dateElement.innerHTML = formatDate(response.data.dt * 1000);

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition[2]);
    getForecast(response.data.coordinates);
}



function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = "40838fb0aebe5a563a3bc60cbb4foaat";
  let lon = position.coordinates.longitude;
  let lat = position.coordinates.latitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function search(city) {
  let apiKey = "40838fb0aebe5a563a3bc60cbb4foaat"
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Lagos");

