import ValidationWidget from './validationwidget';

document.addEventListener('DOMContentLoaded', () => {
  const validation = new ValidationWidget('.card-widget');
  validation.input.addEventListener('input', () => {
    validation.paymentSystemChoice();
  });
  validation.button.addEventListener('click', (e) => {
    e.preventDefault();
    validation.paymentSystemChoice();
    validation.cardValidation(validation.input.value);
  });
});
