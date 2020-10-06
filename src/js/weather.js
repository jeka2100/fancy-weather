import weekInBel from './belarusianData';

/* eslint-disable no-param-reassign */
const setWeather = async (dataWeather) => {
  const tempPlace = document.querySelector('.weatherData__temp-today');
  const descriptionPlace = document.querySelector('.weatherData__description');
  const feelsLikePlace = document.querySelector('.weatherData__feels');
  const windPlace = document.querySelector('.weatherData__wind');
  const iconPlace = document.querySelector('.weatherData__icon');
  const humidityPlace = document.querySelector('.weatherData__humidity');
  tempPlace.innerHTML = `${Math.round(dataWeather.current.temp)}°`;
  const weatherDescription = dataWeather.current.weather[0].description;
  descriptionPlace.innerHTML = weatherDescription[0].toUpperCase() + weatherDescription.slice(1);
  const lang = localStorage.getItem('lang');
  if (lang === 'EN') {
    feelsLikePlace.innerHTML = `Feels like: ${Math.round(dataWeather.current.feels_like)}°`;
    windPlace.innerHTML = `Wind: ${Math.round(dataWeather.current.wind_speed)} m/s`;
    humidityPlace.innerHTML = `Humidity: ${dataWeather.current.humidity} %`;
  } else if (lang === 'RU') {
    feelsLikePlace.innerHTML = `Ощущается как: ${Math.round(dataWeather.current.feels_like)}°`;
    windPlace.innerHTML = `Ветер: ${Math.round(dataWeather.current.wind_speed)} м/с`;
    humidityPlace.innerHTML = `Влажность: ${dataWeather.current.humidity} %`;
  } else if (lang === 'BE') {
    feelsLikePlace.innerHTML = `Адчуваецца як: ${Math.round(dataWeather.current.feels_like)}°`;
    windPlace.innerHTML = `Вецер: ${Math.round(dataWeather.current.wind_speed)} м/с`;
    humidityPlace.innerHTML = `Вільготнасць: ${dataWeather.current.humidity} %`;
  }
  iconPlace.src = `./img/weather-icons/${dataWeather.current.weather[0].icon}.svg`;
};

const setDailyWeather = async (dataWeather) => {
  const dailyWeatherPlace = document.querySelector('.daily');
  for (let i = 0; i < dailyWeatherPlace.childElementCount; i += 1) {
    const day = new Date(Number(`${dataWeather.daily[i + 1].dt}000`));
    const lang = localStorage.getItem('lang');
    if (lang === 'BE') {
      dailyWeatherPlace.children[i].querySelector('.forecast__day').innerHTML = weekInBel[`${day.toLocaleString('ru', { weekday: 'long' })}`];
    } else {
      dailyWeatherPlace.children[i].querySelector('.forecast__day').innerHTML = `${day.toLocaleString(lang, { weekday: 'long' })}`;
    }
    dailyWeatherPlace.children[i].querySelector('.forecast__temp').innerHTML = `${Math.round(dataWeather.daily[i + 1].temp.day)}°`;
    dailyWeatherPlace.children[i].querySelector('.forecast__icon').src = `./img/weather-icons/${dataWeather.daily[i].weather[0].icon}.svg`;
  }
};

const changeTemp = (temp) => {
  const tempTodayBlock = document.querySelector('.weatherData__temp-today');
  const feelsLikeBlock = document.querySelector('.weatherData__feels');
  const forecastBlock = document.querySelectorAll('.forecast__temp');
  const regexOnTemp = /([0-9-])/g;
  if (temp === 'metric') {
    const tempToday = Number(tempTodayBlock.innerHTML.match(regexOnTemp).join(''));
    const feelsLike = Number(feelsLikeBlock.innerHTML.match(regexOnTemp).join(''));
    forecastBlock.forEach((item) => {
      const forecastTemp = Number(item.innerHTML.match(regexOnTemp).join(''));
      item.innerHTML = `${Math.round((forecastTemp - 32) * (5 / 9))}°`;
    });
    tempTodayBlock.innerHTML = `${Math.round((tempToday - 32) * (5 / 9))}°`;
    const lang = localStorage.getItem('lang');
    if (lang === 'EN') {
      feelsLikeBlock.innerHTML = `Feels like: ${Math.round((feelsLike - 32) * (5 / 9))}°`;
    } else if (lang === 'RU') {
      feelsLikeBlock.innerHTML = `Ощущается как: ${Math.round((feelsLike - 32) * (5 / 9))}°`;
    } else if (lang === 'BE') {
      feelsLikeBlock.innerHTML = `Адчуваецца як: ${Math.round((feelsLike - 32) * (5 / 9))}°`;
    }
  } else if (temp === 'imperial') {
    const tempToday = Number(tempTodayBlock.innerHTML.match(regexOnTemp).join(''));
    const feelsLike = Number(feelsLikeBlock.innerHTML.match(regexOnTemp).join(''));
    forecastBlock.forEach((item) => {
      const forecastTemp = Number(item.innerHTML.match(regexOnTemp).join(''));
      item.innerHTML = `${Math.round(forecastTemp * 1.8 + 32)}°`;
    });
    tempTodayBlock.innerHTML = `${Math.round(tempToday * 1.8 + 32)}°`;
    const lang = localStorage.getItem('lang');
    if (lang === 'EN') {
      feelsLikeBlock.innerHTML = `Feels like: ${Math.round(feelsLike * 1.8 + 32)}°`;
    } else if (lang === 'RU') {
      feelsLikeBlock.innerHTML = `Ощущается как: ${Math.round(feelsLike * 1.8 + 32)}°`;
    } else if (lang === 'BE') {
      feelsLikeBlock.innerHTML = `Адчуваецца як: ${Math.round(feelsLike * 1.8 + 32)}°`;
    }
  }
};

export { setWeather, setDailyWeather, changeTemp };
