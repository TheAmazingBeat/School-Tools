let hwList = [], hwValues = [], majorHW = [], minorHW = [];

// Checks whether user has prioritized homeworks
let sortedHW = JSON.parse(localStorage.getItem('homeworks'));
let hwCounter = sortedHW.length
if (sortedHW != null) {
	if (sortedHW.length > 0)
		showPrioritized()
	for (let i = 0; i < hwCounter; i++) {
		addHW(true, sortedHW[i]);
	}
}
else {
	hwList = [], hwValues = [], majorHW = [], minorHW = [], sortedHW = [];
	hwCounter = 0;
	/// First three homework items
	for (let i = 0; i < 3; i++) {
		addHW();
	}

}

// Today's Date
function getDateToday() {
	let date = new Date();
	let today = date.toISOString().substr(0, 10);

	return today;
}

// Creating Inputs for Homework Name, Due Date, and Homework Type
function createCheckBox(stored, object) {
	/// Creates -> <input class="hw-select mx-2" type="checkbox">

	let checkboxCell = document.createElement("th");
	$(checkboxCell).attr("scope", "row");
	$(checkboxCell).attr("class", "hw-select-cell");
	let checkbox = document.createElement("input");
	$(checkbox).attr("class", "hw-select hvr-grow");
	$(checkbox).attr("type", "checkbox");
	$(checkboxCell).append(checkbox);
	return checkboxCell;
}

function createNameInput(stored, object) {
	/// Creates -> <input class="hw-name" type="text" placeholder="Name">
	let nameCell = document.createElement("td");
	$(nameCell).attr("class", "hw-name-cell");
	let nameInput = document.createElement("input");
	$(nameInput).attr("class", "hw-name hvr-grow");
	$(nameInput).attr("type", "text");
	if (stored) {
		$(nameInput).text(object.name);
	} else
		$(nameInput).attr("placeholder", "Homework Item");
	$(nameCell).append(nameInput);
	return nameCell;
}

function createDateInput(stored, object) {
	/// Creates -> <input class="hw-date" type="date" name="duedate">
	let dateInputCell = document.createElement("td");
	$(dateInputCell).attr("class", "hw-date-cell");
	let dateInput = document.createElement("input");
	$(dateInput).attr("class", "hw-date hvr-grow");
	$(dateInput).attr("type", "date");
	$(dateInput).attr("name", "duedate");

	if (stored) {
		let someDate = new Date(object.date)
		$(dateInput).val(someDate.toISOString().substr(0, 10));
	} else {
		// Sets the initial value to today's date
		$(dateInput).val(getDateToday());
	}

	$(dateInputCell).append(dateInput);
	return dateInputCell;
}

function createTypeInput(stored, object) {
	/// Creates -> <select name="type" id="" class="hw-type"><option value="Minor">Minor</option><option value="Major">Major</option></select>
	let typeCell = document.createElement("td");
	$(typeCell).attr("class", "hw-type-cell");
	let typeInput = document.createElement("select");
	$(typeInput).attr("class", "hw-type hvr-grow");
	$(typeInput).attr("name", "type");
	// Minor in dropdown
	let minorOption = document.createElement("option");
	$(minorOption).val("Minor");
	$(minorOption).html("Minor");
	// Major in dropdown
	let majorOption = document.createElement("option");
	$(majorOption).val("Major");
	$(majorOption).html("Major");
	$(typeInput).append(minorOption, majorOption);
	if (stored) {
		$(typeInput).val(object.type);
	}
	$(typeCell).append(typeInput);
	return typeCell;
}

// Getting the value of each input
function getNameInput(index) {
	return $(hwList[index]).find(".hw-name").val();
}

function getDateInput(index) {
	/// Initial Format YYYY-MM-DD
	let dateString = $(hwList[index]).find(".hw-date").val();

	/// Format to MM-DD-YYYY
	let month = dateString.substring(dateString.indexOf('-') + 1, dateString.indexOf('-', dateString.indexOf('-') + 1));
	//// Removes ZERO in the first digit of month
	if (month.substring(0, 1) == '0' && month.length > 1) {
		month = month.substring(1);
	}
	let day = dateString.substring(dateString.indexOf('-', dateString.indexOf('-') + 1) + 1)
	let year = dateString.substring(0, 4)

	let formattedDate = month + '-' + day + '-' + year;

	return formattedDate;
}

function getTypeInput(index) {
	return $(hwList[index]).find(".hw-type").val();
}

// Add a homework item in the list
function addHW(stored, object) {
	/// Creates -> <li class="homework-item my-2"></li>
	let hwItem = document.createElement("tr");
	$(hwItem).attr(
		"class",
		"homework-item animate__animated animate__fadeInDown"
	);

	if (stored) {
	$(hwItem).append(
			createCheckBox(stored, object),
			createNameInput(stored, object),
			createDateInput(stored, object),
			createTypeInput(stored, object)
		);
	} else {
		$(hwItem).append(
			createCheckBox(stored),
			createNameInput(stored),
			createDateInput(stored),
			createTypeInput(stored)
		);
	}


	hwList.unshift(hwItem);
	hwCounter++;
	$("#homework-list > tbody").prepend(hwItem);
}

// Removes the selected homework item(s) in the list
function removeHW() {
	if (hwCounter > 3) {
		for (let i = 0; i < hwCounter; i++) {
			if (
				$(hwList[i]).find(".hw-select-cell").find(".hw-select").is(":checked")
			) {
				$(hwList[i]).attr(
					"class",
					"homework-item my-2 animate__animated animate__fadeOutUp"
				);
				$(hwList[i]).remove();
				hwList.pop();
				hwCounter--;
			}
		}
	} else {
		// $(".alert").toggle();
		alert('At least 3 homeworks required')
	}
}

function getAllInput() {
	for (let i = 0; i < hwCounter; i++) {
		hwValues[i] = {
			name: getNameInput(i),
			date: getDateInput(i),
			type: getTypeInput(i),
		};
	}
}

// Sorts array from closest date to farthest date
function sortByDate(array) {
	/// Selection Sort
	for (let i = 0; i < array.length; i++) {
		let min = i;
		for (let j = i + 1; j < array.length; j++) {
			if (new Date(array[j].date) < new Date(array[i].date)) min = j;
		}
		if (min != i) {
			let temp = array[min];
			array[min] = array[i];
			array[i] = temp;
		}
	}
}

function sortHW() {
	/// Counts how many MAJOR and MINOR assignments
	for (let i = 0; i < hwCounter; i++) {
		if (hwValues[i].type == "Major") {
			majorHW.push(hwValues[i]);
		} else {
			minorHW.push(hwValues[i]);
		}
	}

	/// Sorts MAJOR AND MINOR assignments by due date
	if (minorHW.length > 0) {
		sortByDate(minorHW);
		console.log("Minor Homeworks :: ");
		console.log(minorHW);
	}
	if (majorHW.length > 0) {
		sortByDate(majorHW);
		console.log("Major Homeworks :: ");
		console.log(majorHW);
	}

	/// New array of Major Homeworks + Minor Homeworks
	sortedHW = majorHW.concat(minorHW);

	/// Prioritization between major and minor homeworks based on quantity and date
	let firstMajor;
	for (let i = 0; i < hwCounter; i++) {
		if (sortedHW[i].type == "Major") {
			firstMajor = sortedHW[i];
		}
	}

	for (let i = 0; i < hwCounter; i++) {
		// if (sortedHW[i].type == "Major") {
		// 	firstMajor = sortedHW[i];
		// }
		if (sortedHW[i].type == "Minor" && firstMajor != undefined) {
      /*
       * If there are more minor than major and
       * the major is due in 4 days then the minor comes first
       * 4 days = 345600000 milliseconds
       */
			if (
				minorHW.length > majorHW.length &&
				new Date(firstMajor.date) - new Date(sortedHW[i].date) >= 345600000
			) {
				let temp = sortedHW[i];
				sortedHW[i] = firstMajor;
				sortedHW[sortedHW.indexOf(firstMajor)] = temp;
			}
		}
	}
}

function showPrioritized() {
	hideList();

	// prevents the table from having old list
	$("#sorted-list > tbody").empty();

	// shows the #sortedDiv when button is clicked
	$("#sortedDiv:hidden").toggle("slow");

	for (let i = 0; i < sortedHW.length; i++) {
		let $row = $("<tr>"),
			$numCell = $("<td>"),
			$nameCell = $("<td>"),
			$dateCell = $("<td>"),
			$typeCell = $("<td>");

		$($numCell).html(i + 1);
		$($nameCell).html(sortedHW[i].name);
		$($dateCell).html(sortedHW[i].date);
		$($typeCell).html(sortedHW[i].type);

		$($row).append($numCell, $nameCell, $dateCell, $typeCell);

		$("#sorted-list > tbody").append($row);
	}
}

function storeHW() {
	let homeworks = JSON.stringify(sortedHW);
	localStorage.setItem('homeworks', homeworks);
	console.log('%c Successfully Stored Homeworks!', 'color:green;');
}

// hides where the user edits homework list
function hideList() {
	$("#userDiv:visible").toggle("slow");
}

function edit() {
	$("#sortedDiv:visible").toggle("slow");
	$("#userDiv:hidden").toggle("slow");
}

function prioritize() {
	// resets arrays
	(hwValues = []), (majorHW = []), (minorHW = []);

	getAllInput(), sortHW(), showPrioritized(), storeHW();
}