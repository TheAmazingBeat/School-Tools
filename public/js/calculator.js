//global scope vars
let currentNum = '',
	previousNum = '',
	operator = '',
	functional = '';
let answer = 0;
let numPressed = false,
	opPressed = false;

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
			// TODO: create function for this instead
			if ($text.length > 1) {
				// $screen.text($text.substr(0, $text.length - 1));
				$screen.text($text.slice(0, -1));
				currentNum.slice(0, -1);
			} else if ($text.length <= 1) {
				$screen.text('0');
				currentNum = '0';
			}
			break;
		case 'Enter':
			getNumbers();
			break;
	}
});

// TODO: Add event listeners for the button instead of onclick in html

//Adds number to the screen
function addNumber(n) {
	let $text = $screen.text();

	currentNum += n;
	console.log({
		previousNum,
		currentNum,
	});

	//changes the initial zero on the screen
	if ($text.length == 1 && $text == '0') $screen.text(n);
	//screen moves to the right if overflow
	else if ($text.length >= 8) $screen.text($text.substr(1, $text.length) + n);
	//shows the current number instead of adding to the previous number
	else if (!(previousNum == '')) $screen.text(currentNum);
	else if (answer.toString().length > 0) $screen.text(currentNum);
	//else add pressed number to the screen
	else $screen.text($text + n);

	numPressed = true;
}

//Clear Button
$('.clear-btn').click(function () {
	clear();
	answer = 0;
	$screen.text('0');
	console.log('%c Calculator Cleared!', 'color:green;font-weight:bold;');
});

//Clears Memory of Calculator
function clear() {
	previousNum = '';
	currentNum = '';
	console.log({
		previousNum,
		currentNum,
	});
}

//Assigns the operation of the equation
function operation(op) {
	operator = op;
	if (!($screen.text() == '0' && $screen.text().length == 1)) {
		//case when operation is pressed after solving an equation
		if (
			answer.toString().length > 0 &&
			previousNum == '' &&
			currentNum == ''
		) {
			previousNum = answer.toString();
			console.log({
				previousNum,
				currentNum,
			});
		}

		//does not solve if there is no previous number
		if (previousNum == '') {
			previousNum = currentNum;
			console.log({
				previousNum,
				currentNum,
			});
			currentNum = '';
		}

		//Solves equation after clicking operation (Standard Calculator)
		else if (!(currentNum == '')) {
			console.log({
				previousNum,
				currentNum,
			});
			solve(operator, previousNum, currentNum);
		}
	}
	opPressed = true;
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
			currentNum,
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

	//Returns back answer if equals was pressed again after just solving an equation
	if (!numPressed && !opPressed) {
		// $screen.text(answer.toString());
		return;
	}
	//Return current number if user did not make an equation but pressed equals
	else if (numPressed && !opPressed) {
		answer = parseFloat(currentNum);
		$screen.text(answer.toString());
	}
	//Returns "Error" when user presses operation and then equals
	else if (numPressed && opPressed && second == '') {
		$screen.text('Error');
	} else {
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

		numPressed = false;
		opPressed = false;
		$screen.text(answer.toString());
		clear();
	}

	equalsPressed = true;
	console.log({
		answer,
		previousNum,
		currentNum,
	});
	return answer;
}

// function add(num1, num2) {
// 	return num1 + num2;
// }

// function subtract(num1, num2) {
// 	return num1 - num2;
// }

// function multiply(num1, num2) {
// 	return num1 * num2;
// }

// function divide(num1, num2) {
// 	return num1 / num2;
// }

// function calculate(num1, num2, o) {
// 	return o(num1, num2);
// }
