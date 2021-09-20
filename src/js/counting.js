export default function counting(str) {
  let result;
  if (str.length === 1) {
    result = parseInt(str, 10);
  }
  if (str.length === 2) {
    result = parseInt(str[0], 10) + parseInt(str[1], 10);
  }
  return result;
}
