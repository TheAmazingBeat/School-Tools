const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
let d = new Date();
let monthNum = d.getMonth();
let yearNum = d.getFullYear();
let calendarName = '#monthYear';
let animateDelay = 1500;

// Beginning at the current month and year
$(document).ready(() => {
	$('#prevArrow').click(previous);
	$('#nextArrow').click(next);
	$('#addBtn').click(addCalendarEvent);
	$(calendarName).text(getTheMonth(monthNum) + ' ' + yearNum);
	loadCalendarDays();
	highlightToday();
});

// Highlight current date
const highlightToday = () => {
	const dateString = d.getMonth() + 1 + '-' + d.getDate() + '-' + yearNum;
	const idStem = 'calendarMonthDayYear_';
	const selector = `#${idStem}${dateString}`;
	// console.log("Today's Date DOM Selector: " + selector);
	$(selector).addClass('today');
};

// Get month from months array
const getTheMonth = (num) => {
	if (num < 0) num = 11;
	else if (num > 11) num = 0;

	return months[num];
};

const previous = () => {
	animateDelay = 0;
	// Indicates year before
	if (getTheMonth(monthNum - 1) == months[11]) yearNum--;

	//Month before
	if (monthNum - 1 < 0) {
		//December <- January
		monthNum = 11;
		$(calendarName).text(getTheMonth(monthNum) + ' ' + yearNum);
	} else {
		$(calendarName).text(getTheMonth(monthNum - 1) + ' ' + yearNum);
		monthNum--;
	}

	$(calendarName).attr('class', 'animate__animated animate__fadeInLeft');
	$(calendarName).on('animationend', () => {
		$(calendarName).attr('class', '');
	});

	loadCalendarDays();
	highlightToday();
};

const next = () => {
	animateDelay = 0;
	// Indicates new year
	if (getTheMonth(monthNum + 1) == months[0]) yearNum++;

	// Month after
	if (monthNum + 1 > 11) {
		//December -> January
		monthNum = 0;
		$(calendarName).text(getTheMonth(monthNum) + ' ' + yearNum);
	} else {
		$(calendarName).text(getTheMonth(monthNum + 1) + ' ' + yearNum);
		monthNum++;
	}

	$(calendarName).attr('class', 'animate__animated animate__fadeInRight');
	$(calendarName).on('animationend', () => {
		$(calendarName).attr('class', '');
	});

	loadCalendarDays();
	highlightToday();
};

// Returns the number of days in the month
const daysInMonth = (month, year) => {
	let d = new Date(year, month + 1, 0);
	return d.getDate();
};

const loadCalendarDays = () => {
	$('#calendarDays').html('');
	let days = 0;

	const tmpDate = new Date(yearNum, monthNum, 1);
	// Gets how many days in the month
	const numOfDays = daysInMonth(monthNum, yearNum);
	// Gets the first day of the month
	const dayOfWeek = tmpDate.getDay();

	// create day prefixes before first day of the month
	for (let i = dayOfWeek; i > 0; i--) {
		createDayCells('blank-begin', i, tmpDate);
		days++;
	}
	// creates rest of the days in the month
	for (let i = 0; i < numOfDays; i++) {
		createDayCells('real', i);
		days++;
	}
	// create blank days after last day of the month
	let daysLeft;

	if (days > 35) daysLeft = 42 - days;
	else daysLeft = 35 - days;

	if (days != 35) {
		for (let i = 0; i < daysLeft; i++) {
			createDayCells('blank-end', i);
		}
	}
};

// Makes days in the calendar
const createDayCells = (type, index) => {
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
	}

	// Blank cells after the current month
	if (type == 'blank-end') {
		id = monthNum + 2 + '-' + (index + 1) + '-' + yearNum;
		$(dayCell).attr('id', idStem + id);
		$(dayCell).addClass('blank');
		$(dayCell).attr('data-date', id);

		let daysAfter = index + 1;
		$(dayNum).text(daysAfter);
	}

	//days in the current month
	if (type == 'real') {
		id = monthNum + 1 + '-' + (index + 1) + '-' + yearNum;
		$(dayCell).attr('id', idStem + id);
		$(dayCell).attr('data-date', id);

		let num = index + 1;
		$(dayNum).text(num);
	}

	$(dayCell).append(dayNum);
	$('#calendarDays').append(dayCell);
	animateDelay += 15;
};

// Day Details when clicked on a day
const formatDayModal = (event) => {
	/// Div that triggered the modal
	let button = event.currentTarget;

	/// Extract date from div data-date attribute
	let date = button.getAttribute('data-date');

	/// Update the modal's content.
	//// Date formatting on modal header
	let formatDate = () => {
		let someDate = date.toString();
		let month = someDate.substring(0, someDate.indexOf('-'));
		let day = someDate.substring(
			date.indexOf('-') + 1,
			someDate.indexOf('-', someDate.indexOf('-') + 1)
		);
		let year = someDate.substring(someDate.indexOf('-', someDate.indexOf('-') + 1) + 1);

		return getTheMonth(month - 1) + ' ' + day + ', ' + year;
	};
	$('.modal-title').text(formatDate());

	displayStoredHW(date);
};

// Add Event Form
const addCalendarEvent = () => {
	$('#addBtn').toggle();
	$('#eventForm').show();
	let eventType = '';

	const basedOnType = (type) => {
		if (type == 'homework') {
			$('#homeworkTypeSelect').show();
			$('#eventTimeSelect').hide();
		}
		else {
			let date = new Date();
			$('#eventTimeSelect').show();
			$('#homeworkTypeSelect').hide();
			$('#eventTime').val(`${date.getHours()}:${date.getMinutes()}`)
		}
	};

	$('#calendarType').change(() => {
		try {
			eventType = $('#calendarType').val();
			basedOnType(eventType);
			// console.log(eventType);
		} catch (error) {
			console.error(error);
		}
	});

	if (eventType == 'empty' || eventType == '') return;
};

// Stored HW
let homeworks = JSON.parse(localStorage.getItem('homeworks'));
// Display Homeworks from Prioritizer
const displayStoredHW = (selectedDate) => {
	if (homeworks == null) return;

	$('#schoolWorkList').text('');
	/// Analyze/Format objects
	for (let i = 0; i < homeworks.length; i++) {
		const schoolWorkItem = $('<li class="school-work-item"></li>');
		$(schoolWorkItem).text(`${homeworks[i].name} (${homeworks[i].type} Grade)`);

		//// format dueDate to idSelector
		const dueDate = homeworks[i].dueDate.split('/').join('-');
		if (dueDate == selectedDate) {
			$('#noContent').hide();
			$('#schoolWorkDiv').show();
			$('#schoolWorkList').append(schoolWorkItem);
		} else {
			$('#noContent').show();
			$('#schoolWorkDiv').hide();
		}
	}
};
