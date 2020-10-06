import { getCoordinates, getWeather, getPhotos } from './API';
import { setUnsetLoadIndicator } from './indicators';
import setMap from './map';
import { setCoordinates, setTime, setUnsetError } from './setInformation';

const searchCity = (city) => {
  setUnsetError('off');
  setUnsetLoadIndicator('on');
  getCoordinates(city)
    .then((data) => {
      const coord = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
      const coordArray = coord.split(' ');
      getWeather(coordArray[1], coordArray[0])
        .then((weatherData) => {
          getPhotos(weatherData);
          setTime(weatherData.timezone_offset);
        })
        .then(() => setMap(coordArray[1], coordArray[0]))
        .then(() => setCoordinates(coordArray[1], coordArray[0]))
        .catch(() => setUnsetError('on'));
      setTimeout(() => {
        setUnsetLoadIndicator('off');
      }, 1000);
    })
    .catch(() => setUnsetError('on'));
};

export default searchCity;
