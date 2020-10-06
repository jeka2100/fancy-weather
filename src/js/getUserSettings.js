const getTempSetting = () => {
  const headerTempF = document.querySelector('.header__temp_F');
  const headerTempC = document.querySelector('.header__temp_C');
  if (localStorage.getItem('temp') === 'metric') {
    headerTempF.classList.add('inactive');
  } else if (localStorage.getItem('temp') === 'imperial') {
    headerTempC.classList.add('inactive');
  } else if (localStorage.getItem('temp') === null) {
    headerTempF.classList.add('inactive');
    localStorage.setItem('temp', 'metric');
  }
};

const getLangSettings = () => {
  const langMenuItems = document.querySelectorAll('.header__langMenuItem');
  const currentLang = document.querySelector('.langMenu__lang > span');
  if (localStorage.getItem('lang') === 'EN') {
    langMenuItems[0].classList.remove('inactive');
  } else if (localStorage.getItem('lang') === 'RU') {
    langMenuItems[1].classList.remove('inactive');
  } else if (localStorage.getItem('lang') === 'BE') {
    langMenuItems[2].classList.remove('inactive');
  } else if (localStorage.getItem('lang') === null) {
    langMenuItems[0].classList.remove('inactive');
    localStorage.setItem('lang', 'EN');
  }
  currentLang.innerText = localStorage.getItem('lang');
};

const getVolumeSetting = () => {
  if (localStorage.getItem('volume') === null) {
    localStorage.setItem('volume', 1);
  }
};

export { getTempSetting, getLangSettings, getVolumeSetting };
