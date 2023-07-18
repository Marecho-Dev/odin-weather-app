API_KEY = "5228b0cac36a4a9bae5232552231407";

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  const locationInput = document.getElementById("location-input");
  console.log(locationInput);
  weatherCardUpdate(getWeather(locationInput.value));
});

async function getWeather(location) {
  console.log(location);
  url =
    "https://api.weatherapi.com/v1/current.json?q=" +
    location +
    "&key=" +
    API_KEY;
  const data = await fetch(url, {
    mode: "cors",
  }).then(function (response) {
    return response.json();
  });

  return data;
}

function weatherCardUpdate(weather) {
  weather.then(function (weather) {
    console.log(weather);
    const timestamp = document.getElementById("time");
    const time = weather.location.localtime;
    timestamp.innerText = time.split(" ")[1];
    const day = document.getElementById("day");
    const dt = new Date(time);
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var months = [
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
      "Dec",
    ];
    day.innerText = days[dt.getDay()];
    const date = document.getElementById("date");
    date.innerText =
      dt.getDate() + " " + months[dt.getMonth()] + " " + dt.getFullYear();
    const location = document.getElementById("location");
    location.innerText = weather.location.name + ", " + weather.location.region;
    const temperature = document.getElementById("temperature");
    temperature.innerText = weather.current.temp_f + "°F";
    const status = document.getElementById("status");
    status.innerText = weather.current.condition.text;
    const statusSVG = document.getElementById("status-svg");
    const pathSplit = weather.current.condition.icon.split("/");
    const statusUrl =
      "icons/" +
      pathSplit[pathSplit.length - 2] +
      "/" +
      pathSplit[pathSplit.length - 1];
    statusSVG.style.backgroundImage = "url(" + statusUrl + ")";
    const windAmount = document.getElementById("wind-amount");
    const precipitationAmount = document.getElementById("precipitation-amount");
    const humidityAmount = document.getElementById("precipitation-amount");
    windAmount.innerText = weather.current.wind_mph + " mp/h";
    humidityAmount.innerText = weather.current.humidity + "%";
    precipitationAmount.innerText = weather.current.precip_in + "%";
  });
}
