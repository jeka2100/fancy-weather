import { setPosition, setBackground } from './setInformation';
import { setWeather, setDailyWeather } from './weather';

const weatherMapAPI = 'e95fcc2becdb98d457276e2404755b2b';
const yandexGeoAPI = '8e90be30-75dd-4958-b7dd-babe267fc754';
const flickrAPI = 'a1a66be4c6acb8bbdb0be3db95617e57';

const getSeasonTime = (date) => {
  const month = date.getMonth() + 1;
  const hours = date.getHours();
  let season = '';
  let time = '';
  if (month >= 3 && month <= 5) {
    season = 'spring';
  } else if (month >= 6 && month <= 8) {
    season = 'summer';
  } else if (month >= 9 && month <= 11) {
    season = 'fall';
  } else {
    season = 'winter';
  }

  if (hours >= 5 && hours <= 12) {
    time = 'morning';
  } else if (hours >= 13 && hours <= 17) {
    time = 'afternoon';
  } else {
    time = 'evening';
  }
  // eslint-disable-next-line no-console
  console.log(`Background request options: ${season}, ${time}`);
  return [season, time].join(',');
};

const getPhotos = async (parametres) => {
  try {
    let date;
    if (typeof parametres === 'object') {
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60 * 1000;
      const UTCDate = Date.now() + offset;
      date = new Date(UTCDate + Number(`${parametres.timezone_offset}000`));
    } else if (typeof parametres === 'number') {
      date = new Date(Number(`${parametres}000`));
    }
    const tags = getSeasonTime(date);
    const urlPhotos = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrAPI}&tags=nature,${tags}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`;
    const res = await fetch(urlPhotos);
    const data = await res.json();
    setBackground(data);
    return data;
  } catch (error) {
    document.querySelector('.loadIndicator').classList.add('hidden');
    document.querySelector('.main__content').classList.remove('hidden');
    throw new Error('Error in flickr!');
  }
};

const getWeather = async (lat, lon) => {
  try {
    const units = localStorage.getItem('temp');
    const lang = localStorage.getItem('lang');
    const urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&exclude=hourly&appid=${weatherMapAPI}`;
    const res = await fetch(urlWeather);
    const data = await res.json();
    await setWeather(data);
    await setDailyWeather(data);
    return data;
  } catch (error) {
    document.querySelector('.loadIndicator').classList.add('hidden');
    document.querySelector('.main__content').classList.remove('hidden');
    throw new Error('Error in getWeather!');
  }
};

const getCoordinates = async (city) => {
  try {
    const lang = localStorage.getItem('lang');
    const urlYandexGeo = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${yandexGeoAPI}&lang=${lang}&geocode=${city}&kind=locality&results=1`;
    const res = await fetch(urlYandexGeo);
    const data = await res.json();
    await setPosition(data);
    return data;
  } catch (error) {
    document.querySelector('.loadIndicator').classList.add('hidden');
    document.querySelector('.main__content').classList.remove('hidden');
    throw new Error('Error in YandexGeo!');
  }
};

const getPosition = async (lat, lon) => {
  try {
    const lang = localStorage.getItem('lang');
    const urlYandexGeo = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${yandexGeoAPI}&lang=${lang}&geocode=${lon},${lat}&kind=locality&results=1`;
    const res = await fetch(urlYandexGeo);
    const data = await res.json();
    await setPosition(data);
    return data;
  } catch (error) {
    document.querySelector('.loadIndicator').classList.add('hidden');
    document.querySelector('.main__content').classList.remove('hidden');
    throw new Error('Error in YandexGeo!');
  }
};

export {
  getWeather, getPosition, getCoordinates, getPhotos,
};
