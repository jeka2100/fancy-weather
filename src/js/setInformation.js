import { headerUpdate } from './indicators';

const setTime = async (timeZone) => {
  const timer = setInterval(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60 * 1000;
    const UTCDate = Date.now() + offset;
    const date = new Date(UTCDate + Number(`${timeZone}000`));
    const datePlace = document.querySelector('.weatherData__date');
    const DateOptions = {
      weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
    };
    const lang = localStorage.getItem('lang');
    datePlace.innerHTML = date.toLocaleString(lang, DateOptions);
  }, 1000);
  document.querySelector('.searchForm__button').onclick = () => {
    clearInterval(timer);
  };
};

const setPosition = async (dataPos) => {
  const geoData = dataPos.response.GeoObjectCollection.featureMember[0];
  document.querySelector('.weatherData__location').innerHTML = `${geoData.GeoObject.name}, ${geoData.GeoObject.description}`;
};

const convertCoordinates = (coord) => {
  const degrees = Math.trunc(coord);
  const minutes = Math.trunc(Math.abs(coord - degrees) * 60);
  return `${degrees}° ${minutes}′`;
};

const setCoordinates = async (lat, lon) => {
  const cordLatPlace = document.querySelector('.coordinates__lat');
  const cordLonPlace = document.querySelector('.coordinates__lon');
  const lang = localStorage.getItem('lang');
  if (lang === 'EN') {
    cordLatPlace.innerHTML = `Latitude: ${convertCoordinates(lat)}`;
    cordLonPlace.innerHTML = `Longitude: ${convertCoordinates(lon)}`;
  } else if (lang === 'RU') {
    cordLatPlace.innerHTML = `Широта: ${convertCoordinates(lat)}`;
    cordLonPlace.innerHTML = `Долгота: ${convertCoordinates(lon)}`;
  } else if (lang === 'BE') {
    cordLatPlace.innerHTML = `Шырата: ${convertCoordinates(lat)}`;
    cordLonPlace.innerHTML = `Даўгата: ${convertCoordinates(lon)}`;
  }
};

const setUnsetError = (state) => {
  const errorPlace = document.querySelector('.header__error');
  if (state === 'on') {
    errorPlace.classList.remove('hidden');
  } else if (state === 'off' && !(errorPlace.classList.contains('hidden'))) {
    errorPlace.classList.add('hidden');
  }
};

const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const setBackground = async (data) => {
  if (data !== undefined) {
    const body = document.querySelector('body');
    const photoURL = data.photos.photo[getRandomInRange(0, data.photos.perpage - 1)].url_h;
    body.style.background = `linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(${photoURL}) no-repeat center`;
    body.style.backgroundSize = 'cover';
  }
  headerUpdate('off');
};

const setSearchFormText = () => {
  const searchFormInput = document.querySelector('.searchForm__input');
  const searchFormButton = document.querySelector('.searchForm__button');
  const lang = localStorage.getItem('lang');
  if (lang === 'EN') {
    searchFormInput.placeholder = 'Search city';
    searchFormButton.innerHTML = 'Search';
  } else if (lang === 'RU') {
    searchFormInput.placeholder = 'Найти город';
    searchFormButton.innerHTML = 'Найти';
  } else if (lang === 'BE') {
    searchFormInput.placeholder = 'Пошук горад';
    searchFormButton.innerHTML = 'Пошук';
  }
};

export {
  setTime, setPosition, setCoordinates, setUnsetError, setBackground, setSearchFormText,
};
