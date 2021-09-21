import ValidationWidget from './validationwidget';

document.addEventListener('DOMContentLoaded', () => {
  const validation = new ValidationWidget('.card-widget');
  validation.input.addEventListener('input', () => {
    validation.paymentSystemCheck(validation.input.value);
  });
  validation.button.addEventListener('click', (e) => {
    e.preventDefault();
    validation.paymentSystemCheck();
    validation.cardValidation(validation.input.value);
  });
});
