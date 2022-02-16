import { createDayCells } from './Creator.js';
import { getFromLocalStorage } from './UsefulFunks.js';

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
	$('#calendarType').val('empty');
	$('#nameInput').val('');
	$(calendarName).text(getTheMonth(monthNum) + ' ' + yearNum);
	loadCalendarDays();
	highlightToday();
});

/**
 * Highlights the current, present date on the planner.
 */
const highlightToday = () => {
	const dateString = d.getMonth() + 1 + '-' + d.getDate() + '-' + yearNum;
	const idStem = 'calendarMonthDayYear_';
	const selector = `#${idStem}${dateString}`;
	// console.log("Today's Date DOM Selector: " + selector);
	$(selector).addClass('today');
};

/**
 * Gets the month from months.
 * @param {int} num
 * @returns {String} Name of the month.
 */
const getTheMonth = (num) => {
	if (num < 0) num = 11;
	else if (num > 11) num = 0;

	return months[num];
};

/**
 * Function that makes the calendar go the previous month.
 */
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

/**
 * Function that makes the calendar go the next month.
 */
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

/**
 * @param {number} month
 * @param {number} year
 * @returns {number} the number of days in the month
 */
export const daysInMonth = (month, year) => {
	let d = new Date(year, month + 1, 0);
	return d.getDate();
};

/**
 * Function that calls createDayCells() to render calendar.
 */
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
		createDayCells('blank-begin', i, monthNum, yearNum, animateDelay);
		days++;
	}
	// creates rest of the days in the month
	for (let i = 0; i < numOfDays; i++) {
		createDayCells('real', i, monthNum, yearNum, animateDelay);
		days++;
	}
	// create blank days after last day of the month
	let daysLeft;
	if (days > 35) daysLeft = 42 - days;
	else daysLeft = 35 - days;
	if (days != 35) {
		for (let i = 0; i < daysLeft; i++) {
			createDayCells('blank-end', i, monthNum, yearNum, animateDelay);
		}
	}
};

/**
 * Day Details when clicked on a day
 * @param {Event} event
 */
export const formatDayModal = (event) => {
	/// Div that triggered the modal
	let button = event.currentTarget;

	/// Extract date from div data-date attribute
	let date = button.getAttribute('data-date');
	$('#dayDetails').attr('data-date', date);

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
	displayPlannerEvents(date);
};

/**
 * Displays the Add Calendar Event Form to the modal.
 */
const addCalendarEvent = () => {
	$('#addBtn').slideToggle();
	$('#eventForm').slideToggle();
	let eventType = $('#calendarType').val();

	/**
	 * Shows the different options for making a calendar event by type.
	 * @param {String} type Calendar Event Type
	 */
	const showBasedOnType = (type) => {
		if (type == 'homework') {
			$('#homeworkTypeSelect').show();
			$('#eventTimeSelect').hide();

			// Removes the alert
			if ($('#eventForm').find('[data-alert="empty-event-type"]').length > 0)
				$('[data-alert="empty-event-type"]').remove();
		} else if (type == 'event') {
			let date = new Date();
			$('#eventTimeSelect').show();
			$('#homeworkTypeSelect').hide();
			$('#eventTime').val(`${date.getHours()}:${date.getMinutes()}`);

			// Removes the alert
			if ($('#eventForm').find('[data-alert="empty-event-type"]').length > 0)
				$('[data-alert="empty-event-type"]').remove();
		} else {
			$('#homeworkTypeSelect').hide();
			$('#eventTimeSelect').hide();
		}
	};

	/**
	 * Contains handlers for adding events in the planner.
	 * @param {String} type
	 */
	const addEvent = (type) => {
		/**
		 * Handles homework events.
		 */
		const homeworkHandler = () => {
			// Get input value
			const hwName = $('input#nameInput').val();
			const hwDueDate = $('#dayDetails').attr('data-date').split('-').join('/');
			const hwType = $('input[name="hwType"]:checked').val();

			// Check for value of radios
			if ($('input[name="hwType"]:checked').length > 0) {
				// Remove the alert
				if ($('#eventForm').find('[data-alert="empty-homework-type"]').length > 0)
					$('[data-alert="empty-homework-type"]').remove();
			} else {
				const emptyAlert = $(
					'<div data-alert="empty-homework-type" class="alert alert-danger" role="alert">Please select the homework type</div>'
				);
				if ($('#eventForm').find('[data-alert="empty-homework-type"]').length <= 0)
					$('#eventForm').append(emptyAlert);
			}

			if (hwName == '' || hwDueDate == '' || hwType == undefined) return;

			const Homework = {
				name: hwName,
				dueDate: hwDueDate,
				type: hwType,
			};
			console.log(Homework);

			// Append homework to #dayDetails list
			$('#schoolWorkList').append(
				$(`<li class="school-work-item">${Homework.name} (${Homework.type} Grade)</li>`)
			);
			$('#noContent').hide();
			$('#schoolWorkDiv').show();

			// Store homework in localStorage
			homeworks.push(Homework);
			localStorage.setItem('homeworks', JSON.stringify(homeworks));

			// console.log('homework handled');
		};

		/**
		 * Handles Planner Events.
		 */
		const plannerEventsHandler = () => {
			// Get the input value
			const eventName = $('input#nameInput').val();
			const eventDate = $('#dayDetails').attr('data-date').split('-').join('/');
			const eventTime = $('input#eventTime').val();

			// Append event to #dayDetails list
			const Event = {
				name: eventName,
				date: eventDate,
				time: eventTime,
			};
			$('#eventsList').append(
				$(`<li class="planner-event-item">${Event.name} at ${Event.time}</li>`)
			);
			$('#noContent').hide();
			$('#eventsDiv').show();

			// Store event in localStorage
			plannerEvents.push(Event);
			localStorage.setItem('plannerEvents', JSON.stringify(plannerEvents));
			console.log('event handled');
		};

		/**
		 * Handler when event type is empty
		 */
		const emptyHandler = () => {
			const emptyAlert = $(
				'<div data-alert="empty-event-type" class="alert alert-danger" role="alert">Please select the event type</div>'
			);
			if ($('#eventForm').find('[data-alert="empty-event-type"]').length <= 0)
				$('#eventForm').append(emptyAlert);
			//TODO focus on #calendarType
		};

		switch (type) {
			case 'empty':
				emptyHandler();
				break;
			case 'homework':
				homeworkHandler();
				break;
			case 'event':
				plannerEventsHandler();
				break;
			default:
				emptyHandler();
				break;
		}
	};

	/**
	 * Emptys any planner event handlers when modal is closed.
	 */
	const closeHandler = () => {
		// console.log('Modal was closed.');
		$('select#calendarType').val('empty');
		$('input#nameInput').val('');
		$('input[type=radio]:checked').prop('checked', false);
		$('#homeworkTypeSelect').hide();
		$('#eventTimeSelect').hide();
		$('#addBtn').slideToggle();
		$('#eventForm').slideToggle();
	};

	/**
	 * Event listener for calendar type select dropdown.
	 */
	$('#calendarType').change(() => {
		try {
			eventType = $('#calendarType').val();
			showBasedOnType(eventType);
		} catch (error) {
			console.error(error);
		}
	});
	$('#addEventBtn').click(() => {
		addEvent(eventType);
	});
	$('#dayDetails').on('hide.bs.modal', closeHandler);

	// if (eventType == 'empty' || eventType == '') return;
};

// Stored HW
let homeworks = getFromLocalStorage('homeworks') ? getFromLocalStorage('homeworks') : [];
// let homeworks = JSON.parse(localStorage.getItem('homeworks'));
// console.log(homeworks)
// if (homeworks == null) homeworks = [];
/**
 * Display Homeworks from Prioritizer
 * @param {String} selectedDate
 */
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

// Stored Events
let plannerEvents = getFromLocalStorage('plannerEvents') ? getFromLocalStorage('plannerEvents') : [];
// let plannerEvents = JSON.parse(localStorage.getItem('plannerEvents'));
// console.log(plannerEvents)
// if (plannerEvents == null) plannerEvents = [];
/**
 * Display Planner Events
 * @param {String} selectedDate
 */
const displayPlannerEvents = (selectedDate) => {
	if (plannerEvents == null) return;

	$('#eventsList').text('');
	/// Analyze/Format objects
	for (let i = 0; i < plannerEvents.length; i++) {
		const plannerEventItem = $('<li class="planner-event-item"></li>');
		$(plannerEventItem).text(`${plannerEvents[i].name} at ${plannerEvents[i].date}`);

		//// format dueDate to idSelector
		const eventDate = plannerEvents[i].date.split('/').join('-');
		if (eventDate == selectedDate) {
			$('#noContent').hide();
			$('#eventsDiv').show();
			$('#eventsList').append(plannerEventItem);
		} else {
			$('#noContent').show();
			$('#eventsDiv').hide();
		}
	}
};
