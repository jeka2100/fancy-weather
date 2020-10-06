/* eslint-disable no-undef */
const initMap = (lat, lon) => {
  const myMap = new ymaps.Map('map', {
    center: [lat, lon],
    zoom: 12,
  });
  myMap.geoObjects
    .add(new ymaps.Placemark([lat, lon], {
    }, {
      preset: 'islands#greenDotIconWithCaption',
    }));
};


const setMap = (lat, lon) => {
  document.querySelector('#map').innerHTML = '';
  ymaps.ready(initMap(lat, lon));
};

export default setMap;
