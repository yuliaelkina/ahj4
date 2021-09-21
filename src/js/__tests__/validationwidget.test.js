/**
 * @jest-environment jsdom
 */
import ValidationWidget from '../validationwidget';

document.body.innerHTML='<div class = "card-widget"></div>';
const testWidget = new ValidationWidget('.card-widget');
testWidget.bindToDOM();
test('проверка валидной карты visa', () => {
  expect(testWidget.checkValidity('4929034079850508')).toBeTruthy();
  expect(testWidget.paymentSystemCheck('4929034079850508')).toBe('visa');
});

test('проверка невалидной карты mastercard', () => {
  expect(testWidget.checkValidity('5200267734676643')).toBeFalsy();
  expect(testWidget.paymentSystemCheck('5200267734676643')).toBe('mastercard');
});

test('проверка валидной карты  americanexpress', () => {
  expect(testWidget.checkValidity('372762315553136')).toBeTruthy();
  expect(testWidget.paymentSystemCheck('372762315553136')).toBe('americanexpress');
});
