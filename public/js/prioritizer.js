import { createNameInput, createDateType } from './Creator.js';
import { getFromLocalStorage, storeToLocalStorage } from './UsefulFunks.js';

let homeworks = [],
  sortedHW = [],
  doneHW = [];
const requiredNumberOfHW = 1;
let homeworkClicked = false;

jQuery(() => {
  checkForHomework();
  $('#addHwBtn').on('click', () => {
    addHW(false);
  });
  $('#prioritizeBtn').on('click', prioritize);

  $(document).on('click', (e) => {
    if ($(e.target).parents('svg.fa-trash-can').length > 0) removeHW(e.target);
    else if ($(e.target).hasClass('fa-trash-can')) removeHW(e.target);
    else homeworkClickHandler(e);
  });
});

/**
 * Main function to call functions in order
 */
function prioritize() {
  sortHW(getAllInput);
  storeToLocalStorage('homeworks', sortedHW);
  // console.log(sortedHW);
  $('.homework-list').css('list-style-type', 'decimal');
  // window.location.reload(); //Temporary
}

/**
 * Checks whether user has prioritized homeworks
 */
function checkForHomework() {
  sortedHW = getFromLocalStorage('homeworks');
  console.log('%cSorted Homework ::', 'color:green;');
  console.table(sortedHW);

  /// When there is no homeworks found in localStorage
  if (sortedHW == null || sortedHW.length == 0) {
    //// Required Homework Items
    for (let i = 0; i < requiredNumberOfHW; i++) {
      addHW(false);
    }
    return false;
  } else {
    for (let i = 0; i < sortedHW.length; i++) {
      addHW(true, sortedHW[i]);
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
  // let parent = null;
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
    $(parentOne).find('.name-input').find('.fa-trash-can').addClass('visible');
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

/**
 * Add a homework item in the list
 * @param {bool} isStored Boolean if there are stored homeworks
 * @param {Homework} hwObject The stored homework
 */
function addHW(isStored, hwObject) {
  let objName, objDate, objType;
  if (isStored) {
    if (hwObject) objName = hwObject.name;
    if (hwObject) objDate = hwObject.dueDate;
    if (hwObject) objType = hwObject.type;
  }

  const homework = new Homework(objName, objDate, objType, isStored, hwObject);
  homeworks.push(homework);
  $('.homework-list').append(homework.element);

  /// Focus Event Handler
  $(homework.element).on('focusin', (e) => {
    homeworkClicked = true;
    const options = $(e.currentTarget).find('.options');
    const checkbox = $(e.currentTarget).find('.name-input').find('.hw-check');
    const trashcan = $(e.currentTarget).find('.name-input').find('svg');

    $(options).addClass('visible');
    $(checkbox).addClass('visible');
    $(checkbox).on('click', () => {
      if ($(checkbox).prop('checked')) checkedHandler(homework, removeHW);
    });
    $(trashcan).addClass('visible');
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
function removeHW(target) {
  const hwItem =
    $(target).parents('.homework-item').length > 0
      ? $(target).parents('.homework-item')
      : $(target);
  $(hwItem).animate(
    {
      left: '100%',
      opacity: 0,
    },
    500,
    'swing',
    () => {
      for (let i = 0; i < homeworks.length; i++) {
        if (homeworks[i].element == hwItem[0]) {
          if (
            homeworks[i].name == sortedHW[i].name &&
            homeworks[i].dueDate == sortedHW[i].dueDate &&
            homeworks[i].type == sortedHW[i].type
          ) {
            sortedHW.splice(i, 1);
          }
          homeworks.splice(i, 1);
        }
      }
      $(hwItem).remove();
      storeToLocalStorage('homeworks', sortedHW);
      console.log(homeworks);
      console.log(sortedHW);
    }
  );
}

function checkedHandler(object, remove) {
  if (object.name == undefined) {
    console.log($(object.element).find('#doneCheck').prop('checked', false));
    // alert('Homework has no name');
    return;
  }
  $(object.element).addClass('checked');
  doneHW.push(object.element);
  console.log(doneHW);
  remove(object.element);
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
    let day = dateString.substring(
      dateString.indexOf('-', dateString.indexOf('-') + 1) + 1
    );
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

  for (let i in homeworks) {
    homeworks[i].name = getNameInput(i);
    homeworks[i].dueDate = getDateInput(i);
    homeworks[i].type = getTypeInput(i);
  }
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
function sortHW(getValues) {
  getValues();
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
        // minorHW.length > majorHW.length &&
        new Date(firstMajor.dueDate) - new Date(sortedHW[i].dueDate) >=
        345600000
      ) {
        let temp = sortedHW[i];
        sortedHW[i] = firstMajor;
        sortedHW[sortedHW.indexOf(firstMajor)] = temp;
      }
    }
  }

  // console.log('Sorted HW ::');
  // console.log(sortedHW);
}
