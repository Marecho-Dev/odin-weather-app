API_KEY = "5228b0cac36a4a9bae5232552231407";

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  const location = document.getElementById("location");
  weatherCardUpdate(getWeather(location.value));
});

async function getWeather(location) {
  const data = await fetch(
    "https://api.weatherapi.com/v1/current.json?q=33328&key=" + API_KEY,
    {
      mode: "cors",
    }
  ).then(function (response) {
    return response.json();
  });

  return data;
}

function weatherCardUpdate(weather) {
  weather.then(function (weather) {
    console.log(weather);
  });
}
