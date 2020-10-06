import searchCity from './search';

const soundNotification = () => {
  const city = document.querySelector('.weatherData__location').innerHTML;
  const temp = document.querySelector('.weatherData__temp-today').innerHTML;
  const weatherDescription = document.querySelector('.weatherData__description').innerHTML;
  const weatherFeels = document.querySelector('.weatherData__feels').innerHTML;
  const weatherWind = document.querySelector('.weatherData__wind').innerHTML;
  const weatherHumidity = document.querySelector('.weatherData__humidity').innerHTML;
  let template = `${city} ${temp}. ${weatherDescription}. ${weatherFeels}. ${weatherWind}. ${weatherHumidity}.`;
  const lang = localStorage.getItem('lang');
  if (lang === 'EN') {
    template = `Today in ${template}`;
  } else if (lang === 'RU' || lang === 'BE') {
    template = `Сегодня в ${template}`;
  }
  let voices = window.speechSynthesis.getVoices();
  setTimeout(() => { voices = window.speechSynthesis.getVoices(); }, 1000);
  function findVoice(audioLang) {
    for (let i = 0; i < voices.length; i += 1) {
      if (voices[i].lang === audioLang) { return voices[i]; }
    }
    return null;
  }
  if (!window.speechSynthesis) { return; }
  const utterance = new SpeechSynthesisUtterance(template);
  if (lang === 'EN') {
    utterance.lang = 'en-EN';
  } else if (lang === 'RU' || lang === 'BE') {
    utterance.lang = 'ru-RU';
  }
  utterance.volume = localStorage.getItem('volume');
  utterance.voice = findVoice(utterance.lang);
  window.speechSynthesis.speak(utterance);
};

let recognition;
const startRecognition = () => {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition
    || window.mozSpeechRecognition || window.msSpeechRecognition)();
  recognition.lang = localStorage.getItem('lang');
  recognition.interimResults = false;
  recognition.start();
  recognition.onresult = (event) => {
    const resText = event.results[0][0].transcript;
    if (resText === 'weather') {
      soundNotification();
      return;
    }
    if (resText === 'louder') {
      const volume = localStorage.getItem('volume');
      if (volume <= 0.5) {
        localStorage.setItem('volume', Number(volume) + 0.5);
      }
      return;
    }
    if (resText === 'quieter') {
      const volume = localStorage.getItem('volume');
      if (volume >= 0.5) {
        localStorage.setItem('volume', Number(volume) - 0.5);
      }
      return;
    }
    document.querySelector('.searchForm__input').value = resText;
    searchCity(resText);
    document.querySelector('.searchForm__button').click();
  };
  recognition.onend = () => {
    const microphoneIcon = document.querySelector('.searchForm__microphone > .fas');
    microphoneIcon.classList.remove('fa-microphone-slash');
    microphoneIcon.classList.add('fa-microphone');
  };
};

const stopRecognition = () => {
  recognition.abort();
};

export { startRecognition, stopRecognition, soundNotification };
