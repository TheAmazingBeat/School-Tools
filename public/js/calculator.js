// jshint esversion:6
//jshint -W018

//global scope vars
let currentNum = '',
   previousNum = '',
   operator = '',
   functional = '';
let answer = 0;

const $screen = $('#screenText');
$('#screenText').text('0');



//Register Keyboard Presses
document.addEventListener('keydown', function (event) {
   var $text = $screen.text();
   // console.log(event.key);

   switch (event.key) {
      case '.':
         addNumber('.');
         break;
      case '0':
         addNumber('0');
         break;
      case '1':
         addNumber('1');
         break;
      case '2':
         addNumber('2');
         break;
      case '3':
         addNumber('3');
         break;
      case '4':
         addNumber('4');
         break;
      case '5':
         addNumber('5');
         break;
      case '6':
         addNumber('6');
         break;
      case '7':
         addNumber('7');
         break;
      case '8':
         addNumber('8');
         break;
      case '9':
         addNumber('9');
         break;

      case '+':
         operation('add');
         break;
      case '-':
         operation('subtract');
         break;
      case '*':
         operation('multiply');
         break;
      case '/':
         operation('divide');
         break;

      case 'Backspace':
         if ($text.length > 1) {
            $screen.text($text.substr(0, $text.length - 1));
         } else if ($text.length <= 0) {
            $screen.text('0');
         }
         break;
      case 'Enter':
         getNumbers();
         break;
   }
});


//Adds number to the screen
function addNumber(n) {
   let $text = $screen.text();

   currentNum += n;
   console.log({
      previousNum,
      currentNum
   });

   //changes the initial zero on the screen
   if ($text.length == 1 && $text == '0')
      $screen.text(n);
   //screen moves to the right if overflow
   else if ($text.length >= 8)
      $screen.text($text.substr(1, $text.length) + n);
   //shows the current number instead of adding to the previous number
   else if (!(previousNum == ''))
      $screen.text(currentNum);
   else if (answer.toString().length > 0)
      $screen.text(currentNum);
   //else add pressed number to the screen
   else
      $screen.text($text + n);
}


//Clear Button
$('.clear-btn').click(function () {
   clear();
   answer = 0;
   $screen.text('0');
   console.log('Calculator Cleared!');
});

//Clears Memory of Calculator
function clear() {
   previousNum = '';
   currentNum = '';
   console.log({
      previousNum,
      currentNum
   });
}


//Assigns the operation of the equation
function operation(op) {
   operator = op;
   if (!($screen.text() == '0' && $screen.text().length == 1)) {
      //case when operation is pressed after solving an equation
      if (answer.toString().length > 0 && previousNum == '' && currentNum == '') {
         previousNum = answer.toString();
         console.log({
            previousNum,
            currentNum
         });
      }

      //does not solve if there is no previous number
      if (previousNum == '') {
         previousNum = currentNum;
         console.log({
            previousNum,
            currentNum
         });
         currentNum = '';
      }

      //Solves equation after clicking operation (Standard Calculator)
      else if (!(currentNum == '')) {
         console.log({
            previousNum,
            currentNum
         });
         solve(operator, previousNum, currentNum);
      }

   }
}

function functionals(f) {
   functional = f;
   if (!(currentNum == '')) {
      let currentTemp = 0;

      switch (functional) {
         //Switch number to a negative
         case 'plusminus':
            currentTemp = parseFloat(currentNum);
            currentTemp *= -1;
            currentNum = currentTemp.toString();
            break;

            //Number as a percent
         case 'percent':
            currentTemp = parseFloat(currentNum);
            currentTemp /= 100;
            currentNum = currentTemp.toString();
            break;
      }

      $screen.text(currentNum);
      console.log({
         currentNum
      });
   }
}


//Gets the previousNum, currentNum, and operator to make an equation
function getNumbers() {
   solve(operator, previousNum, currentNum);
}


//Solves the equation set up by getNumbers()
function solve(operator, first, second) {
   let numOne = parseFloat(first);
   let numTwo = parseFloat(second);

   switch (operator) {
      case 'add':
         answer = numOne + numTwo;
         break;
      case 'subtract':
         answer = numOne - numTwo;
         break;
      case 'multiply':
         answer = numOne * numTwo;
         break;
      case 'divide':
         answer = numOne / numTwo;
         break;
   }

   $screen.text(answer.toString());
   clear();
   console.log({
      answer,
      previousNum,
      currentNum
   });
   return answer;
}