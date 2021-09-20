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

  paymentSystemChoice() {
    const cardNumver = this.input.value;
    let paymentSystem;
    if (cardNumver.startsWith('2')) {
      paymentSystem = 'mir';
    } else if (cardNumver.startsWith('34') || cardNumver.startsWith('37')) {
      paymentSystem = 'americanexpress';
    } else if (cardNumver.startsWith('30') || cardNumver.startsWith('36') || cardNumver.startsWith('38')) {
      paymentSystem = 'dinnersclub';
    } else if (cardNumver.startsWith('4')) {
      paymentSystem = 'visa';
    } else if (cardNumver.startsWith('50') || cardNumver.startsWith('56') || cardNumver.startsWith('57') || cardNumver.startsWith('58') || cardNumver.startsWith('63') || cardNumver.startsWith('67')) {
      paymentSystem = 'maestro';
    } else if (cardNumver.startsWith('51') || cardNumver.startsWith('52') || cardNumver.startsWith('53') || cardNumver.startsWith('54') || cardNumver.startsWith('55')) {
      paymentSystem = 'mastercard';
    } else if (cardNumver.startsWith('60')) {
      paymentSystem = 'discover';
    }
    this.icons.forEach((element) => {
      if (element.getAttribute('data-paymentsys') === paymentSystem) {
        element.classList.add('cards__icon--active');
      } else {
        element.classList.remove('cards__icon--active');
      }
    });
  }

  checkValidity(value) {
    if (value.length !== 16) {
      this.result.classList.add('validity--negative');
      this.result.innerText = 'Номер карты должен содержать 16 симовов';
      return false;
    }
    let resultValue = 0;
    const cardNumber = Array.from(value);
    cardNumber.pop();
    cardNumber.forEach((elem, ind) => {
      if (ind % 2 === 1) {
        resultValue += parseInt(elem, 10);
      } else {
        const multiplyDigit = parseInt(elem, 10) * 2;
        resultValue += counting(multiplyDigit.toString());
      }
    });
    const checkDigit = 10 - (resultValue % 10);
    if (checkDigit === value[15]) {
      return true;
    }
    return false;
  }

  cardValidation(value) {
    if (this.checkValidity(value) === true) {
      this.result.classList.remove('validity--negative');
      this.result.classList.add('validity--positive');
      this.result.innerText = 'Карта валидна!';
    } else {
      this.result.classList.remove('validity--positive');
      this.result.classList.add('validity--negative');
      this.result.innerText = 'Такой карты не cуществует! Проверьте правильность ввода';
    }
  }
}