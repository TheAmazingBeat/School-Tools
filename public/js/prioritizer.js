let homeworks = [],
	sortedHW = [];
const requiredNumberOfHW = 3;

$(document).ready(() => {
	checkForHomework();
	$('#addBtn').click(addHW);
	$('#removeBtn').click(removeHW);
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
	getAllInput(), sortHW(), showPrioritized(), storeHW();
};

/**
 * Checks whether user has prioritized homeworks
 */
const checkForHomework = () => {
	sortedHW = JSON.parse(localStorage.getItem('homeworks'));

	/// When there is no homeworks found in localStorage
	if (sortedHW == null) {
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
 * @param {*} isStored Boolean if there are stored homeworks
 * @param {*} hwObject The stored homework
 */
// eslint-disable-next-line no-unused-vars
const addHW = (isStored, hwObject) => {
	const homework = new Homework(undefined, undefined, undefined, isStored, hwObject);
	homeworks.push(homework);
	$('#homework-list > tbody').append(homework.element);
};

/**
 * Removes the selected homework item(s) in the list
 */
const removeHW = (isStored, eventData) => {
	//TODO change rankings when removing homeworks
	if (isStored) {
		const parent = $(eventData.currentTarget).parents('tbody');
		$(parent).find(eventData.currentTarget).remove();
	}

	if (homeworks.length < 3) alert('At least 3 homeworks required');

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
 * @returns Today's Date
 */
const getDateToday = () => {
	// const today = new Date().toISOString().substring(0, 10);
	return new Date().toISOString().substring(0, 10);
};

/**
 * Creates a checkbox for the homework
 * @returns Checkbox element
 */
const createCheckBox = () => {
	/// Creates -> <input class="hw-select hvr-grow" type="checkbox">
	const $checkboxCell = $('<th class="hw-select-cell" scope="row"></th>');
	const $checkbox = $('<input class="hw-select hvr-grow" type="checkbox">');

	$($checkboxCell).append($checkbox);
	return $checkboxCell;
};

/**
 * Creates an input for homework's name
 * @param {*} isStored Boolean if there are stored homeworks
 * @param {*} hwObject The stored homework
 * @returns Name Input element
 */
const createNameInput = (isStored, hwObject) => {
	/// Creates -> <input class="hw-name" type="text" placeholder="Name">
	const $nameCell = $('<td class="hw-name-cell">');
	const $nameInput = $(
		'<input class="hw-name hvr-grow" type="text" name="homeworkName" placeholder="Homework Item" required>'
	);

	if (isStored) $nameInput.val(hwObject.name);

	$nameCell.append($nameInput);

	return $nameCell;
};

/**
 * Creates an input for homework's due date
 * @param {*} isStored Boolean if there are stored homeworks
 * @param {*} hwObject The stored homework
 * @returns Date Input element
 */
const createDateInput = (isStored, hwObject) => {
	/// Creates -> <input class="hw-date" type="date" name="duedate">
	const $dateCell = $('<td class="hw-date-cell">');
	const $dateInput = $('<input class="hw-date hvr-grow" type="date" name="dueDate">');

	if (isStored) {
		const someDate = new Date(hwObject.dueDate);
		$dateInput.val(someDate.toISOString().substring(0, 10));
	} else {
		//// Sets the initial value to today's date
		$dateInput.val(getDateToday());
	}

	$dateCell.append($dateInput);
	return $dateCell;
};

/**
 * Creates an input for homework's type (minor or major)
 * @param {*} isStored Boolean if there are stored homeworks
 * @param {*} hwObject The stored homework
 * @returns Type Input element
 */
const createTypeInput = (isStored, hwObject) => {
	/*// Creates -> 
	/* 		<select name="type" id="" class="hw-type">
	/*				<option value="Minor">Minor</option>
	/* 			<option value="Major">Major</option>
	/* 		</select>
	//*/

	/// Select input
	const $typeCell = $('<td class="hw-type-cell"></td>');
	const $typeInput = $('<select class="hw-type hvr-grow" name="homeworkType"></select>');

	/// Minor in dropdown
	const $minorOption = $('<option value="Minor">Minor</option>');

	/// Major in dropdown
	const $majorOption = $('<option value="Major">Major</option>');

	$($typeInput).append($minorOption, $majorOption);

	if (isStored) {
		$($typeInput).val(hwObject.type);
	}

	$($typeCell).append($typeInput);
	return $typeCell;
};

/**
 * Getting the value of Homework Name Input
 * @param {*} index The index of the homework
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
 * @param {*} index The index of the homework
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
 * @param {*} index The index of the homework
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
	for (let i = 0; i < homeworks.length; i++) {
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
 * @param {*} array Array to sort.
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

		$('#sorted-list > tbody').append($row);
	}
};

/**
 * Stores sorted homework to localStorage.
 */
const storeHW = () => {
	localStorage.setItem('homeworks', JSON.stringify(sortedHW));
	console.log('%c Successfully Stored Homeworks!', 'color:green;');
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