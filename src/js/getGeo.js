import { getWeather, getPosition, getPhotos } from './API';
import setMap from './map';
import {
  setCoordinates, setTime, setUnsetError, setSearchFormText,
} from './setInformation';
import { setUnsetLoadIndicator } from './indicators';

const getUserGeo = () => {
  setSearchFormText();
  const geoSuccess = (pos) => {
    const crd = pos.coords;
    getPosition(crd.latitude, crd.longitude)
      .then(() => {
        getWeather(crd.latitude, crd.longitude)
          .then((weatherData) => {
            getPhotos(weatherData);
            setTime(weatherData.timezone_offset);
          })
          .catch(() => setUnsetError('on'));
      })
      .then(() => setMap(crd.latitude, crd.longitude))
      .then(() => setCoordinates(crd.latitude, crd.longitude))
      .catch(() => setUnsetError('on'));
    setTimeout(() => {
      setUnsetLoadIndicator('off');
    }, 1000);
  };
  const geoError = (error) => {
    setUnsetLoadIndicator('off');
    document.querySelectorAll('.wrapper')[1].innerHTML = `<div class="geoError">${error.message}</div>`;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

export default getUserGeo;
