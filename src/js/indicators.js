const setUnsetLoadIndicator = (state) => {
  const mainContentBlock = document.querySelector('.main__content');
  const loadIndicator = document.querySelector('.loadIndicator');
  if (state === 'off') {
    mainContentBlock.classList.remove('hidden');
    loadIndicator.classList.add('hidden');
  } else if (state === 'on') {
    mainContentBlock.classList.add('hidden');
    loadIndicator.classList.remove('hidden');
  }
};

const headerUpdate = async (state) => {
  const headerUpdateButton = document.querySelector('.header__update > i');
  if (state === 'off') {
    headerUpdateButton.classList.remove('animate');
  } else if (state === 'on') {
    headerUpdateButton.classList.add('animate');
  }
};

export { setUnsetLoadIndicator, headerUpdate };
