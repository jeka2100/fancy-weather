import getUserGeo from './js/getGeo';
import searchCity from './js/search';
import { getPhotos } from './js/API';
import { headerUpdate } from './js/indicators';
import { changeTemp } from './js/weather';
import Modal from './js/modal';
import { getTempSetting, getLangSettings, getVolumeSetting } from './js/getUserSettings';
import { startRecognition, stopRecognition, soundNotification } from './js/voiceMethods';

const addHeaderButtonsClickHandler = () => {
  const headerButtons = document.querySelector('.header__left');
  const langButton = document.querySelector('.langMenu__lang');
  const langButtonArrow = document.querySelector('.langMenu__lang > i');
  const langMenu = document.querySelector('.langMenu__menu');
  const headerTempF = document.querySelector('.header__temp_F');
  const headerTempC = document.querySelector('.header__temp_C');
  headerButtons.addEventListener('click', (event) => {
    if (event.target.closest('.header__update')) {
      headerUpdate('on');
      getPhotos(1590320939);
    }
    if (event.target.closest('.header__langMenu') && langButton.classList.contains('display')) {
      langButton.classList.remove('display');
      langButtonArrow.classList.remove('display');
      langMenu.classList.remove('display');
    } else if (event.target.closest('.header__langMenu')) {
      langButton.classList.add('display');
      langButtonArrow.classList.add('display');
      langMenu.classList.add('display');
    }
    if (event.target.closest('.header__temp_F') && headerTempF.classList.contains('inactive')) {
      headerTempF.classList.remove('inactive');
      headerTempC.classList.add('inactive');
      localStorage.setItem('temp', 'imperial');
      changeTemp('imperial');
    } else if (event.target.closest('.header__temp_C') && headerTempC.classList.contains('inactive')) {
      headerTempC.classList.remove('inactive');
      headerTempF.classList.add('inactive');
      localStorage.setItem('temp', 'metric');
      changeTemp('metric');
    }
    if (event.target.closest('.header__langMenuItem')) {
      const currentLang = document.querySelector('.langMenu__lang > span');
      const langMenuItems = document.querySelectorAll('.header__langMenuItem');
      const formInput = document.querySelector('.searchForm__input');
      if (event.target.innerText !== currentLang.innerText) {
        currentLang.innerText = event.target.innerText;
        localStorage.setItem('lang', event.target.innerText);
        langMenuItems.forEach((item) => item.classList.add('inactive'));
        event.target.classList.remove('inactive');
        if (formInput.value !== '') {
          const city = formInput.value;
          searchCity(city);
        } else {
          getUserGeo();
        }
      }
    }
  });
};

const addFormClickHandler = () => {
  const form = document.querySelector('.searchForm');
  const formInput = document.querySelector('.searchForm__input');
  form.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.closest('.searchForm__button') && formInput.value !== '') {
      const city = formInput.value;
      searchCity(city);
    }
    if (event.target.closest('.searchForm__microphone')) {
      const microphoneIcon = document.querySelector('.searchForm__microphone > .fas');
      if (microphoneIcon.classList.contains('fa-microphone')) {
        microphoneIcon.classList.remove('fa-microphone');
        microphoneIcon.classList.add('fa-microphone-slash');
        const audio = new Audio('./audio/beeping.mp3');
        audio.play();
        startRecognition();
      } else if (microphoneIcon.classList.contains('fa-microphone-slash')) {
        microphoneIcon.classList.remove('fa-microphone-slash');
        microphoneIcon.classList.add('fa-microphone');
        stopRecognition();
      }
    }
    if (event.target.closest('.searchForm__speak')) {
      soundNotification();
    }
  });
};

window.onload = () => {
  const modal = new Modal();
  modal.buildModal();
  getTempSetting();
  getLangSettings();
  getVolumeSetting();
  getUserGeo();
  addHeaderButtonsClickHandler();
  addFormClickHandler();
};
