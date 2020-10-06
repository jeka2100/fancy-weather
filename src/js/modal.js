export default class Modal {
  constructor() {
    this.modalContent = '';
  }

  buildModal() {
    this.modalContent = document.createElement('div');
    this.modalContent.classList.add('modal__content');
    this.setContent();
    this.addCloseButton();
    this.openModal();
    this.bindEvents();
  }

  setContent() {
    const modalBlock = document.createElement('div');
    modalBlock.classList.add('modal__block');
    const title = '<h2 class="content__title">Attention! Information for Cross Check.</h2>';
    modalBlock.innerHTML = '<p>If the weather does not work, try to access the site through a VPN. My OpenWeatherMap sometimes works only through a VPN.</p>';
    modalBlock.innerHTML += '<p>Notification code phrase: weather</p>';
    modalBlock.innerHTML += '<p>Notification volume up code phrase: louder</p>';
    modalBlock.innerHTML += '<p>Notification volume down code phrase: quieter</p>';
    this.modalContent.innerHTML = title;
    this.modalContent.append(modalBlock);
  }

  addCloseButton() {
    this.modalContent.innerHTML += '<i class="modal__closeButton fas fa-times"></i>';
  }

  openModal() {
    document.querySelector('.overlay').classList.remove('hidden');
    document.querySelector('.modal').append(this.modalContent);
  }

  bindEvents() {
    document.querySelector('.overlay').addEventListener('click', this.closeModal);
    document.querySelector('.modal__closeButton').addEventListener('click', this.closeModal);
  }

  closeModal(event) {
    this.event = event;
    const classes = this.event.target.classList;
    if (classes.contains('overlay') || classes.contains('modal__closeButton')) {
      document.querySelector('.overlay').classList.add('hidden');
      document.querySelector('.modal').innerHTML = '';
    }
  }
}
