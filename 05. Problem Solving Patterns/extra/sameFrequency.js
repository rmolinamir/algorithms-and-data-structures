/**
 * Write a function called sameFrequency. Given two positive integers, find out if the
 * two numbers have the same frequency of digits.
 * @param {Number} num1 - Integer 1.
 * @param {Number} num2 - Integer 2.
 */
function sameFrequency(num1, num2) {
  // Counting the digits in num1.
  const num1Digits = new Map();
  const num1String = num1.toString();
  for (const digit of num1String) {
    const num1DigitCount = num1Digits.get(digit);
    if (num1DigitCount) {
      num1Digits.set(digit, num1DigitCount + 1)
    } else {
      num1Digits.set(digit, 1)
    }
  }
  // Counting the digits in num2.
  const num2Digits = new Map();
  const num2String = num2.toString();
  for (const digit of num2String) {
    const num2DigitCount = num2Digits.get(digit);
    if (num2DigitCount) {
      num2Digits.set(digit, num2DigitCount + 1)
    } else {
      num2Digits.set(digit, 1)
    }
  }
  // Comparing digit counts.
  for (const [digit, count] of num1Digits) {
    const num2DigitCount = num2Digits.get(digit);
    if (count !== num2DigitCount) {
      return false;
    }
  }
  return true;
}

console.log(sameFrequency(182, 281)); // true
console.log(sameFrequency(34, 14)); // false
console.log(sameFrequency(3589578, 5879385)); // true
console.log(sameFrequency(22, 222)); // false
