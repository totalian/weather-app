const citySearch = document.querySelector("input");
const cityTemperature = document.querySelector(".city-temperature");
const weatherIcon = document.querySelector(".weather-icon");
const description = document.querySelector(".description");
const giphy = document.querySelector(".giphy");

const getCityValue = () => citySearch.value;

citySearch.addEventListener("keypress", (e) => {
  let city = getCityValue();
  if (e.key === "Enter") {
    clearInput();
    updateUI(city);
  }
});

const updateCityAndTemperature = (city, temperature) => {
  let string = `${city} ${temperature}°C`;
  cityTemperature.textContent = string;
};

const updateWeatherImage = (url) => {
  weatherIcon.src = url;
};

const updateDescription = (text) => {
  description.textContent = text;
};

const updateGify = (obj) => {
  const url = obj.data.images.original.url;
  giphy.src = url;
};

const getWeather = async (city) => {
  const apiKey = "00e4f530ba66ceb306527af704041aef";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(url);
  return response.json();
};

const show = () => {
  cityTemperature.style.display = "block";
  weatherIcon.style.display = "block";
  description.style.display = "block";
  giphy.style.display = "block";
};

const hide = () => {
  cityTemperature.style.display = "none";
  weatherIcon.style.display = "none";
  description.style.display = "none";
};

const updateUI = (city) => {
  getWeather(city)
    .then((response) => {
      const cityName = response.name;
      const temperature = response.main.temp;
      const temperatureCelcius = KelvinToCelcius(temperature);
      const temperatureFarenheit = KelvinToFarenheit(temperature);
      const description = response.weather[0].description;
      const weatherIcon = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
      return {
        cityName,
        temperatureCelcius,
        temperatureFarenheit,
        description,
        weatherIcon,
      };
    })
    .then((response) => {
      updateCityAndTemperature(response.cityName, response.temperatureCelcius);
      updateDescription(response.description);
      updateWeatherImage(response.weatherIcon);
      updateDescription(response.description);
      return response.description;
    })
    .then((response) => getGif(response))
    .then((response) => updateGify(response))
    .then(show())
    .catch((err) => {
      hide();
      getGif("error")
        .then((response) => {
          updateGify(response);
        })
        .catch((err) => {
          giphy.style.display = "none";
        });
    });
};

const clearInput = () => (citySearch.value = "");

const getGif = async (term) => {
  const apiKey = "H9EJUPw2h9opxx1ZXKTqtBrx9lIDtqFg";
  const url = `https://api.giphy.com/v1/gifs/translate?s=${term}&api_key=${apiKey}`;
  const response = await fetch(url, { mode: "cors" });
  const responseJSON = response.json();
  return responseJSON;
};

const KelvinToCelcius = (temp) => Math.round(temp - 273.15);
const KelvinToFarenheit = (temp) => Math.round((temp - 273.15) * (9 / 5) + 32);
