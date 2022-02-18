import { createCheckBox, createNameInput, createDateInput, createTypeInput } from './Creator.js';
import { getFromLocalStorage, storeToLocalStorage } from './UsefulFunks.js';

let homeworks = [],
	sortedHW = [];
const requiredNumberOfHW = 3;

$(document).ready(() => {
	checkForHomework();
	$('#addHwBtn').click(() => {
		addHW(false);
	});
	$('#removeHwBtn').click(() => {
		removeHW(false);
	});
	$('#prioritizeBtn').click(prioritize);
	$('#editBtn').click(editList);
	$('.stored-hw-item').click((e) => {
		removeHW(true, e);
	});
});

/**
 * Main function to call functions in order
 */
const prioritize = () => {
	getAllInput(), sortHW(), showPrioritized(), storeToLocalStorage('homeworks', homeworks);
};

/**
 * Checks whether user has prioritized homeworks
 */
const checkForHomework = () => {
	sortedHW = getFromLocalStorage('homeworks');
	// console.log(sortedHW);

	/// When there is no homeworks found in localStorage
	if (sortedHW == null || sortedHW.length == 0) {
		//// First three homework items
		for (let i = 0; i < requiredNumberOfHW; i++) {
			addHW(false);
		}
		$('#userDiv').slideToggle('slow');
		return false;
	} else {
		showPrioritized();
		for (let i = 0; i < sortedHW.length; i++) {
			addHW(true, sortedHW[i]);
		}
		return true;
	}
};

function Homework(hwName, hwDueDate, hwType, isStored, hwObject) {
	let hwItem = $('<tr class="homework-item animate__animated animate__fadeInDown"></tr>');
	this.element = $(hwItem).append(
		createCheckBox(isStored, hwObject),
		createNameInput(isStored, hwObject),
		createDateInput(isStored, hwObject),
		createTypeInput(isStored, hwObject)
	);
	this.name = hwName;
	this.dueDate = hwDueDate;
	this.type = hwType;
}

/**
 * Add a homework item in the list
 * @param {bool} isStored Boolean if there are stored homeworks
 * @param {Homework} hwObject The stored homework
 */
const addHW = (isStored, hwObject) => {
	const homework = new Homework(undefined, undefined, undefined, isStored, hwObject);
	homeworks.push(homework);
	$('#homework-list > tbody').append(homework.element);
};

/**
 * Removes the selected homework item(s) in the list
 * @param {boolean} isStored Boolean if there are stored homeworks
 * @param {Event} eventData
 */
const removeHW = (isStored, eventData) => {
	//TODO change rankings when removing homeworks
	if (isStored) {
		const parent = $(eventData.currentTarget).parents('tbody');
		let children = $(parent).children();
		for (let i = 0; i < children.length; i++) {
			console.log(children[i] == eventData.currentTarget);
			if (children[i] == eventData.currentTarget) {
				$(parent).find(children[i]).remove();
				sortedHW.splice(i, 1);
				homeworks = sortedHW;
			}
		}
		storeToLocalStorage('homeworks', sortedHW);
		homeworks = sortedHW;
		showPrioritized();
	}

	// if (homeworks.length < 3) alert('At least 3 homeworks required');

	for (let i = 0; i < homeworks.length; i++) {
		let tempObj = homeworks[i].element;
		if ($(tempObj).find('.hw-select-cell').find('.hw-select').is(':checked')) {
			$(tempObj).attr('class', 'homework-item my-2 animate__animated animate__fadeOutUp');
			$(tempObj).remove();
			homeworks.pop();
		}
	}
};

/**
 * Getting the value of Homework Name Input
 * @param {number} index The index of the homework
 * @returns Name value inside Name Input
 */
const getNameInput = (index) => {
	let value = '(No Name)';
	try {
		value = $(homeworks[index].element).find('.hw-name').val();
	} catch (error) {
		console.log(error);
	}
	return value;
};

/**
 * Getting the value of Homework Due Date Input
 * @param {number} index The index of the homework
 * @returns Due Date value inside Date Input
 */
const getDateInput = (index) => {
	//TODO Maybe there is a Built-in JS function for formatting dates
	/// Initial Format YYYY-MM-DD
	let dateString = '';

	try {
		dateString = $(homeworks[index].element).find('.hw-date').val();
	} catch (error) {
		console.log(error);
	}

	if (dateString == '') return;

	/// Format to MM-DD-YYYY
	let month = dateString.substring(
		dateString.indexOf('-') + 1,
		dateString.indexOf('-', dateString.indexOf('-') + 1)
	);
	//// Removes ZERO in the first digit of month
	if (month.substring(0, 1) == '0' && month.length > 1) {
		month = month.substring(1);
	}
	let day = dateString.substring(dateString.indexOf('-', dateString.indexOf('-') + 1) + 1);
	let year = dateString.substring(0, 4);

	let formattedDate = month + '/' + day + '/' + year;

	return formattedDate;
};

/**
 * Getting the value of Homework Type Input
 * @param {number} index The index of the homework
 * @returns Option value inside Select Type Input
 */
const getTypeInput = (index) => {
	let value = '';
	try {
		value = $(homeworks[index].element).find('.hw-type').val();
	} catch (error) {
		console.log(error);
	}
	return value;
};

/**
 * Assigns all input values to homework object inside hwValues Array
 */
const getAllInput = () => {
	// hwValues = [];
	for (let i in homeworks) {
		homeworks[i].name = getNameInput(i);
		homeworks[i].dueDate = getDateInput(i);
		homeworks[i].type = getTypeInput(i);
		// hwValues[i] = {
		// 	name: getNameInput(i),
		// 	date: getDateInput(i),
		// 	type: getTypeInput(i),
		// };
	}
};

/**
 * Sorts array from closest date to farthest date.
 * @param {Array} array Array to sort.
 */
const sortByDate = (array) => {
	/// Selection Sort
	for (let i = 0; i < array.length; i++) {
		let min = i;
		for (let j = i + 1; j < array.length; j++) {
			// let prev = j - 1;
			if (new Date(array[j].dueDate) < new Date(array[i].dueDate)) min = j;
			// else if (new Date(array[j].dueDate).getTime() == new Date(array[prev].dueDate).getTime())
			// 	min = prev;
		}
		if (min != i) {
			let temp = array[min];
			array[min] = array[i];
			array[i] = temp;
		}
	}
};

/**
 * Sort the homeworks.
 */
const sortHW = () => {
	let majorHW = [],
		minorHW = [];

	/// Counts how many MAJOR and MINOR assignments
	for (let i = 0; i < homeworks.length; i++) {
		if (homeworks[i].type == 'Major') majorHW.push(homeworks[i]);
		else minorHW.push(homeworks[i]);
	}

	/// Sorts MAJOR AND MINOR assignments by due date
	if (minorHW.length > 0) {
		sortByDate(minorHW);
		// console.log('Minor Homeworks :: ');
		// console.log(minorHW);
	}
	if (majorHW.length > 0) {
		sortByDate(majorHW);
		// console.log('Major Homeworks :: ');
		// console.log(majorHW);
	}

	/// New array of Major Homeworks + Minor Homeworks
	sortedHW = majorHW.concat(minorHW);

	/// Prioritization between major and minor homeworks based on quantity and date
	let firstMajor;
	for (let i = 0; i < sortedHW.length; i++) {
		if (sortedHW[i].type == 'Major') {
			firstMajor = sortedHW[i];
		}
	}

	for (let i = 0; i < homeworks.length; i++) {
		if (sortedHW[i].type == 'Minor' && firstMajor != undefined) {
			/*
			 * If there are more minor than major and
			 * the major is due in 4 days then the minor comes first
			 * 4 days = 345600000 milliseconds
			 */
			if (
				minorHW.length > majorHW.length &&
				new Date(firstMajor.dueDate) - new Date(sortedHW[i].dueDate) >= 345600000
			) {
				let temp = sortedHW[i];
				sortedHW[i] = firstMajor;
				sortedHW[sortedHW.indexOf(firstMajor)] = temp;
			}
		}
	}
};

/**
 * Show sorted homework.
 */
const showPrioritized = () => {
	hideList();

	// prevents the table from having old list
	$('#sorted-list > tbody').empty();

	// shows the #sortedDiv when button is clicked
	$('#sortedDiv:hidden').slideToggle('slow');

	// each homework row
	for (let i = 0; i < sortedHW.length; i++) {
		let $row = $(
				`<tr class="stored-hw-item animate__animated animate__fadeInUp" data-rank="${i + 1}">`
			),
			$numCell = $('<td class="rank-num">'),
			$nameCell = $('<td class="stored-hw-name">'),
			$dateCell = $('<td class="stored-hw-date">'),
			$typeCell = $('<td class="store-hw-type">');

		$($numCell).html(i + 1);
		$($nameCell).html(sortedHW[i].name);
		$($dateCell).html(sortedHW[i].dueDate);
		$($typeCell).html(sortedHW[i].type);

		$($row).append($numCell, $nameCell, $dateCell, $typeCell);
		$($row).click((e) => {
			removeHW(true, e);
		});

		$('#sorted-list > tbody').append($row);
	}
};

/**
 * Hides where the user edits homework list.
 */
const hideList = () => {
	$('#userDiv:visible').slideToggle('slow');
};

/**
 * Shows where the user edits the homework list
 */
const editList = () => {
	$('#sortedDiv:visible').slideToggle('slow');
	$('#userDiv:hidden').slideToggle('slow');
};
