import {
	createNameInput,
	createDateType,
	createEmptyAlert,
} from './Creator.js';
import { getFromLocalStorage, storeToLocalStorage } from './UsefulFunks.js';

let homeworks = [],
	sortedHW = [],
	doneHW = [];
const requiredNumberOfHW = 1;
let homeworkClicked = false;

jQuery(() => {
	checkForHomework();

	$('#addHwBtn').on('click', () => {
		addHomework(false);
	});

	$('#prioritizeBtn').on('click', prioritize);

	$(document).on('click', (e) => {
		if ($(e.target).parents('svg.fa-trash-can').length > 0)
			removeHomework(e.target, false);
		else if ($(e.target).hasClass('fa-trash-can'))
			removeHomework(e.target, false);
		else homeworkClickHandler(e);
	});
});

/**
 * Main function to call functions in order
 */
function prioritize() {
	sortHomework(getAllInput);
	storeToLocalStorage('homeworks', sortedHW);
}

/**
 * Checks whether user has prioritized homeworks
 */
function checkForHomework() {
	sortedHW = getFromLocalStorage('homeworks');
	doneHW = getFromLocalStorage('doneHomework');
	console.info('%cSorted Homework ::', 'color:green;');
	console.table(sortedHW);
	console.info('%cDone Homework ::', 'color:blue;');
	console.table(doneHW);

	if (doneHW != null) {
		for (let i in doneHW) {
			addHomework(true, doneHW[i], true);
		}
	} else doneHW = [];

	/// When there is no homeworks found in localStorage
	if (sortedHW == null || sortedHW.length == 0) {
		//// Required Homework Items
		for (let i = 0; i < requiredNumberOfHW; i++) {
			addHomework(false);
		}
		return false;
	} else {
		$('.homework-list').css('list-style-type', 'decimal');

		for (let i = 0; i < sortedHW.length; i++) {
			addHomework(true, sortedHW[i], false);
		}

		console.log('%cHomework ::', 'color:green;');
		console.table(homeworks);
		return true;
	}
}

/**
 * Homework Object
 * @param {String} hwName
 * @param {String} hwDueDate
 * @param {String} hwType
 * @param {boolean} isStored
 * @param {jQueryObject} hwObject
 */
function Homework(hwName, hwDueDate, hwType, isStored, hwObject) {
	let hwItem = $('<li class="homework-item"></li>');

	this.element = $(hwItem).append(
		createNameInput(isStored, hwObject),
		createDateType(isStored, hwObject)
	)[0];
	this.name = hwName;
	this.dueDate = hwDueDate;
	this.type = hwType;

	this.getName = () => {
		return $(this.element).find('.hw-name').val();
	};

	this.getDate = () => {
		return $(this.element).find('.hw-date').val();
	};

	this.getType = () => {
		return $(this.element).find('.hw-type').val();
	};

	this.updateName = () => {
		this.name = $(this.element).find('.hw-name').val();
		return this.name;
	};
	this.updateDate = () => {
		this.dueDate = $(this.element).find('.hw-date').val();

		/// Format to MM-DD-YYYY
		let month = this.dueDate.substring(
			this.dueDate.indexOf('-') + 1,
			this.dueDate.indexOf('-', this.dueDate.indexOf('-') + 1)
		);
		let day = this.dueDate.substring(
			this.dueDate.indexOf('-', this.dueDate.indexOf('-') + 1) + 1
		);
		let year = this.dueDate.substring(0, 4);

		let formattedDate = month + '/' + day + '/' + year;

		this.dueDate = formattedDate;
		return this.dueDate;
	};
	this.updateType = () => {
		this.type = $(this.element).find('.hw-type').val();
	};
}

/**
 * Add a homework item in the list
 * @param {boolean} isStored Boolean if there are stored homeworks
 * @param {Homework} hwObject The stored homework
 * @param {boolean} done
 */
function addHomework(isStored, hwObject, done) {
	let objName, objDate, objType;
	if (isStored) {
		if (hwObject) objName = hwObject.name;
		if (hwObject) objDate = hwObject.dueDate;
		if (hwObject) objType = hwObject.type;
	}

	const homework = new Homework(objName, objDate, objType, isStored, hwObject);

	if (!done) {
		homeworks.push(homework);
		$('.homework-list').append(homework.element);
	} else {
		$(homework.element).addClass('done');
		$(homework.element).find('.hw-check').prop('checked', true);
		$('.done-homework-list').prepend(homework.element);
	}

	/// Focus Event Handler
	$(homework.element).on('focusin', (e) => {
		homeworkClicked = true;
		const options = $(e.currentTarget).find('.options');
		const checkbox = $(e.currentTarget).find('.name-input').find('.hw-check');
		const trashcan = $(e.currentTarget).find('.name-input').find('svg');

		$(options).addClass('visible');
		$(checkbox).addClass('visible');
		$(trashcan).addClass('visible');
	});

	// Check Handler
	const checkbox = $(homework.element).find('.name-input').find('.hw-check');
	$(checkbox).on('click', () => {
		if ($(checkbox).prop('checked'))
			homeworkCheckedHandler(homework, removeHomework);
		// console.log(doneHW);
	});

	if (!isStored) $('.homework-list').css('list-style-type', 'disc');

	$(homework.element).on('mouseenter', (e) => {
		homeworkHoverHandler(e);
	});
	$(homework.element).on('mouseleave', (e) => {
		homeworkHoverHandler(e);
	});

	// console.log(homeworks);
}

/**
 * Removes the selected homework item(s) in the list
 * @param {jQueryObject} target DOM Element to be removed
 */
function removeHomework(target, done) {
	const hwItem =
		$(target).parents('.homework-item').length > 0
			? $(target).parents('.homework-item')
			: $(target);
	console.log(hwItem);

	$(hwItem).animate(
		{
			left: '100%',
			opacity: 0,
			'pointer-events': 'none',
		},
		500,
		'swing',
		() => {
			// if matches sortedHW, remove from sortedHW
			for (let i = 0; i < homeworks.length; i++) {
				if (homeworks[i].element != hwItem[i]) break;
				if (sortedHW == null || sortedHW.length == 0) break;
				if (homeworks[i].name == undefined || homeworks[i].name.length == 0)
					break;

				if (
					homeworks[i].name == sortedHW[i].name &&
					homeworks[i].dueDate == sortedHW[i].dueDate &&
					homeworks[i].type == sortedHW[i].type
				)
					sortedHW.splice(i, 1);

				homeworks.splice(i, 1);
			}

			for (let i = 0; i < doneHW.length; i++) {
				// if (doneHW[i].element != hwItem[i]) break;
				if (doneHW == null || doneHW.length == 0) break;
				if (doneHW[i].name == undefined || doneHW[i].name.length == 0)
					break;

        console.log($(hwItem[i]).find('.name-input').find('.hw-name').val());

				if (
					doneHW[i].name ==
					$(hwItem[i]).find('.name-input').find('.hw-name').val()
				)
					doneHW.splice(i, 1);
			}

			if (!done) {
				$(hwItem).remove();
			} else {
				$(hwItem).css('opacity', 0.2);
			}
			storeToLocalStorage('homeworks', sortedHW);
			storeToLocalStorage('doneHomework', doneHW);

			// console.log(homeworks);
			// console.log(sortedHW);
		}
	);
}

let prevClicked = null;
function homeworkClickHandler(e) {
	const parentOne = $(e.target).parents('.homework-item');
	const parentTwo = $(prevClicked).parents('.homework-item');

	if (e.target != prevClicked && parentOne[0] != parentTwo[0]) {
		$(parentTwo).find('.options').removeClass('visible');
		$(parentTwo).find('.name-input').find('.hw-check').removeClass('visible');
		$(parentTwo)
			.find('.name-input')
			.find('.fa-trash-can')
			.removeClass('visible');
	}

	if (!$(e.target).closest('.homework-item').length && homeworkClicked) {
		$(parentOne).find('.options').removeClass('visible');
		$(parentOne).find('.name-input').find('.hw-check').removeClass('visible');
		$(parentOne)
			.find('.name-input')
			.find('.fa-trash-can')
			.removeClass('visible');
		homeworkClicked = false;
	}
	prevClicked = e.target;
}

function homeworkHoverHandler(e) {
	if (homeworkClicked) return;

	const parentOne =
		$(e.target).hasClass('hw-check') ||
		$(e.target).hasClass('hw-name') ||
		$(e.target).hasClass('fa-trash-can')
			? $(e.target).parents('.homework-item')[0]
			: e.target == $('.homework-list')[0]
			? $(e.target).find('.homework-item')[0]
			: e.target;

	if (e.type == 'mouseenter') {
		$(parentOne).find('.name-input').find('.hw-check').addClass('visible');
		$(parentOne)
			.find('.name-input')
			.find('.fa-trash-can')
			.addClass('visible');
	}

	if (e.type == 'mouseleave') {
		$(parentOne).find('.name-input').find('.hw-check').removeClass('visible');
		$(parentOne)
			.find('.name-input')
			.find('.fa-trash-can')
			.removeClass('visible');
		homeworkClicked = false;
	}
}

function homeworkCheckedHandler(object, remove) {
	object.updateName();

	if (object.name == undefined || object.name.length == 0) {
		$(object.element).find('#doneCheck').prop('checked', false);
		validateName($(object.element).find('.hw-name'));
	}

	if (validateName($(object.element).find('.hw-name'))) {
		$(object.element).addClass('checked');
		storeDoneHomework(object).then(remove(object.element, true));
	}
	// console.log(doneHW);
}

function validateName(object) {
	const value = $(object).val();
	if (value.length > 0) {
		$(object).removeClass('empty');
		return true;
	}

	if ($('.empty-alert').length <= 0)
		$('.list-container').prepend(createEmptyAlert);

	$(object).addClass('empty');

	return false;
}

async function storeDoneHomework(object) {
	object.updateName();
	object.updateDate();
	object.updateType();
	doneHW.push(object);
	$('.done-homework-list').prepend(object.element);
	storeToLocalStorage('doneHomework', doneHW);
	return true;
}

/**
 * Assigns all input values to homework object inside hwValues Array
 */
function getAllInput() {
	/**
	 * Getting the value of Homework Name Input
	 * @param {number} index The index of the homework
	 * @returns Name value inside Name Input
	 */
	const getNameInput = (index) => {
		let value = '(No Name)';
		try {
			if (validateName($(homeworks[index].element).find('.hw-name')))
				value = $(homeworks[index].element).find('.hw-name').val();
			else return false;
		} catch (error) {
			console.log(error);
		}
		return value;
	};

	for (let i in homeworks) {
		if (!getNameInput(i)) return false;
		homeworks[i].updateName();
		homeworks[i].updateDate();
		homeworks[i].updateType();
	}
	return true;
}

/**
 * Sorts array from closest date to farthest date.
 * @param {Array} array Array to sort.
 */
function sortByDate(array) {
	/// Selection Sort
	for (let i = 0; i < array.length; i++) {
		let min = i;

		for (let j = i + 1; j < array.length; j++) {
			if (new Date(array[j].dueDate) < new Date(array[i].dueDate)) min = j;
		}

		if (min != i) {
			let temp = array[min];
			array[min] = array[i];
			array[i] = temp;
		}
	}
}

/**
 * Sort the homeworks.
 */
function sortHomework(getValues) {
	if (!getValues()) return;
	else getValues();

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
			 * the major is due in 4 days then the minor comes first
			 * 4 days = 345600000 milliseconds
			 */
			if (
				new Date(firstMajor.dueDate) - new Date(sortedHW[i].dueDate) >=
				345600000
			) {
				let temp = sortedHW[i];
				sortedHW[i] = firstMajor;
				sortedHW[sortedHW.indexOf(firstMajor)] = temp;
			}
		}
	}

	$('.homework-list').css('list-style-type', 'decimal');

	// console.log('Sorted HW ::');
	// console.log(sortedHW);
}
