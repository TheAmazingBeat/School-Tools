import { daysInMonth, formatDayModal } from './planner.js';
import { getFromLocalStorage } from './UsefulFunks.js';
/**
 * @returns Today's Date (formatted)
 */
const getDateToday = () => {
	// const today = new Date().toISOString().substring(0, 10);
	return new Date().toISOString().substring(0, 10);
};

/**
 * Creates a checkbox for the homework.
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
 * @param {bool} isStored Boolean if there are stored homeworks
 * @param {Homework} hwObject The stored homework
 * @returns Name Input element
 */
const createNameInput = (isStored, hwObject) => {
	/// Creates -> <input class="hw-name" type="text" placeholder="Name">
	const $nameCell = $('<td class="hw-name-cell">');
	const $nameInput = $(
		'<input class="hw-name hvr-grow" type="text" name="homeworkName" placeholder="Homework Name" required>'
	);

	if (isStored) $nameInput.val(hwObject.name);

	$nameCell.append($nameInput);

	return $nameCell;
};

/**
 * Creates an input for homework's due date
 * @param {bool} isStored Boolean if there are stored homeworks
 * @param {Homework} hwObject The stored homework
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
 * @param {bool} isStored Boolean if there are stored homeworks
 * @param {Homework} hwObject The stored homework
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
 * Makes days in the calendar
 * @param {String} type blank-begin, blank-end, or real
 * @param {number} index index of day
 * @param {number} monthNum The number of the current month.
 * @param {number} yearNum The number of the current year.
 * @param {number} animateDelay
 */
const createDayCells = (type, index, monthNum, yearNum, animateDelay) => {
	let idStem = 'calendarMonthDayYear_';
	let id = '';

	// Base day cell
	const dayCell = $('<div class="day animate__animated animate__fadeIn"></div>');
	// $(dayCell).addClass('day animate__animated animate__fadeIn');
	$(dayCell).css('animation-delay', animateDelay.toString() + 'ms');
	$(dayCell).attr('data-bs-toggle', 'modal').attr('data-bs-target', '#dayDetails');
	$(dayCell).click((e) => {
		formatDayModal(e);
	});

	// Text inside cell
	const dayNum = $('<div class="day-num"></div>');

	// Blank cells before the current month
	if (type == 'blank-begin') {
		let daysBefore = daysInMonth(monthNum - 1, yearNum) - (index - 1);
		id = monthNum + '-' + daysBefore + '-' + yearNum;
		$(dayCell).attr('id', idStem + id);
		$(dayCell).addClass('blank');
		$(dayCell).attr('data-date', id);

		$(dayNum).text(daysBefore);
		createEventPills(id, dayCell);
	}

	// Blank cells after the current month
	if (type == 'blank-end') {
		id = monthNum + 2 + '-' + (index + 1) + '-' + yearNum;
		$(dayCell).attr('id', idStem + id);
		$(dayCell).addClass('blank');
		$(dayCell).attr('data-date', id);

		let daysAfter = index + 1;
		$(dayNum).text(daysAfter);
		createEventPills(id, dayCell);
	}

	//days in the current month
	if (type == 'real') {
		id = monthNum + 1 + '-' + (index + 1) + '-' + yearNum;
		$(dayCell).attr('id', idStem + id);
		$(dayCell).attr('data-date', id);

		let num = index + 1;
		$(dayNum).text(num);
		createEventPills(id, dayCell);
	}

	$(dayCell).prepend(dayNum);
	$('#calendarDays').append(dayCell);
	animateDelay += 15;
};

/**
 * Creates pills inside day cells for events stored.
 * @param {number} date
 * @param {jQueryObject} parentCell
 */
const createEventPills = (date, parentCell) => {
	let homeworks = getFromLocalStorage('homeworks') ? getFromLocalStorage('homeworks') : [];
	let plannerEvents = getFromLocalStorage('plannerEvents')
		? getFromLocalStorage('plannerEvents')
		: [];
	let pillNumber = 0;
	let eventsLeft = homeworks.length + plannerEvents.length;

	const createPill = (pillType, name) => {
		return $(
			`<div class="event-pill ${pillType}-pill"><span class="event-pill-name">${name}</span></div>`
		);
	};

	for (let i in homeworks) {
		if (pillNumber < 4) {
			let currentDate;

			try {
				currentDate = homeworks[i].dueDate.split('/').join('-');
			} catch (error) {
				console.error(error);
			}

			if (currentDate == date) {
				$(parentCell).append(createPill('homework', homeworks[i].name));
				pillNumber++;
				eventsLeft--;
			}
		} else {
			$(parentCell).append(createPill('more-event', `${eventsLeft} More`));
		}
	}

	for (let i in plannerEvents) {
		if (pillNumber < 4) {
			let currentDate;

			try {
				currentDate = plannerEvents[i].date.split('/').join('-');
			} catch (error) {
				console.error(error);
			}

			if (currentDate == date) {
				$(parentCell).append(createPill('planner-event', plannerEvents[i].name));
				pillNumber++;
				eventsLeft--;
			}
		} else {
			$(parentCell).append(createPill('more-event', `${eventsLeft} More`));
		}
	}
};

export {
	createCheckBox,
	createNameInput,
	createDateInput,
	createTypeInput,
	createDayCells,
	// getFromLocalStorage,
};
