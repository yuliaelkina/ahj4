/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import counting from './counting';

export default class ValidationWidget {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this._element = element;
    this.input = this._element.querySelector('.validation__input');
    this.icons = Array.from(this._element.querySelectorAll('.cards__icon'));
    this.button = this._element.querySelector('.validation__button');
    this.result = this._element.querySelector('.validity');
  }

  static get markup() {
    return `<div class="cards">
    <ul class="cards__list">
      <li class="cards__item"><img src="./img/mir.png" alt="мир" data-paymentsys="mir" class="cards__icon"></li>
      <li class="cards__item"><img src="./img/visa.png" alt="виза" data-paymentsys="visa" class="cards__icon"></li>
      <li class="cards__item"><img src="./img/mastercard.png" alt="мастеркард" data-paymentsys="mastercard" class="cards__icon"></li>
      <li class="cards__item"><img src="./img/maestro.png" alt="маэстро" data-paymentsys="maestro" class="cards__icon"></li>
      <li class="cards__item"><img src="./img/americanexpress.png" alt="американ экспресс" data-paymentsys="americanexpress" class="cards__icon"></li>
      <li class="cards__item"><img src="./img/discover.png" alt="дискавер" data-paymentsys="discover" class="cards__icon"></li>
      <li class="cards__item"><img src="./img/dinnersclub.png" alt="диннерс клаб" data-paymentsys="dinnersclub" class="cards__icon"></li>
    </ul>
  </div>
  <form action="" class="validation__form">
    <input type="text" pattern="[0-9]{3}" class="validation__input">
    <button type="button" class="validation__button">Click to validate</button>
  </form>
  <div class="validity"></div>`;
  }

  bindToDOM() {
    this._element.innerHTML = this.constructor.markup;
  }

  paymentSystemCheck(cardNumber) {
    let paymentSystem;
    if (cardNumber.startsWith('2')) {
      paymentSystem = 'mir';
    } else if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
      paymentSystem = 'americanexpress';
    } else if (cardNumber.startsWith('30') || cardNumber.startsWith('36') || cardNumber.startsWith('38')) {
      paymentSystem = 'dinnersclub';
    } else if (cardNumber.startsWith('4')) {
      paymentSystem = 'visa';
    } else if (cardNumber.startsWith('50') || cardNumber.startsWith('56') || cardNumber.startsWith('57') || cardNumber.startsWith('58') || cardNumber.startsWith('63') || cardNumber.startsWith('67')) {
      paymentSystem = 'maestro';
    } else if (cardNumber.startsWith('51') || cardNumber.startsWith('52') || cardNumber.startsWith('53') || cardNumber.startsWith('54') || cardNumber.startsWith('55')) {
      paymentSystem = 'mastercard';
    } else if (cardNumber.startsWith('60')) {
      paymentSystem = 'discover';
    }
    this.icons.forEach((element) => {
      if (element.getAttribute('data-paymentsys') === paymentSystem) {
        element.classList.add('cards__icon--active');
      } else {
        element.classList.remove('cards__icon--active');
      }
    });
    return paymentSystem;
  }

  checkValidity(value) {
    if (value.length <= 14) {
      this.result.classList.add('validity--negative');
      this.result.innerText = 'Номер карты должен содержать минимум 14 симовов';
      return false;
    }
    let resultValue = 0;
    const cardNumber = Array.from(value);
    cardNumber.pop();
    cardNumber.reverse();
    for (let i = 0; i <= cardNumber.length - 1; i += 2) {
      const multiplyDigit = parseInt(cardNumber[i], 10) * 2;
      resultValue += counting(multiplyDigit.toString());
    }
    for (let i = 1; i <= cardNumber.length - 1; i += 2) {
      resultValue += parseInt(cardNumber[i], 10);
    }
    const checkDigit = 10 - (resultValue % 10);
    if (checkDigit === parseInt(value[value.length - 1], 10)) {
      return true;
    }
    return false;
  }

  cardValidation(value) {
    if (this.checkValidity(value) === true) {
      this.result.classList.remove('validity--negative');
      this.result.classList.add('validity--positive');
      this.result.innerText = 'Карта валидна!';
    } else if (this.result.innerText === '') {
      this.result.classList.remove('validity--positive');
      this.result.classList.add('validity--negative');
      this.result.innerText = 'Такой карты не cуществует! Проверьте правильность ввода';
    }
  }
}
