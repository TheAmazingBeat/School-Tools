//jshint esversion:6

const months = ['January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'
];

let d = new Date();
// let currMonth = d.getMonth();
// let currYear = d.getFullYear();
let monthNum = d.getMonth();
let yearNum = d.getFullYear();
let $calendar = $('#monthYear');

function dateLog(){
   console.log('%c Date:', 'color: green; font-weight: bold;' );
   console.log({monthNum, yearNum});
}


//Beginning at the current month and year
$(document).ready(function () {
   $calendar.text(getTheMonth(monthNum) + ' ' + yearNum);
   dateLog();
   loadCalendarDays();
});

/*
function getRealMonth() {
   return getTheMonth(d.getMonth());
}
*/

//Get month from string array
function getTheMonth(num) {
   let month;

   if (num < 0)
      num = 11;
   else if (num > 11)
      num = 0;

   month = months[num];
   return month;
}

function previous() {
   //Indicates year before
   if (getTheMonth(monthNum - 1) == months[11])
      yearNum--;

   //Month before
   if ((monthNum - 1) < 0) { //December <- January
      monthNum = 11;
      $calendar.text(getTheMonth(monthNum) + ' ' + yearNum);
   } else {
      $calendar.text(getTheMonth(monthNum - 1) + ' ' + yearNum);
      monthNum--;
   }

   dateLog();
   loadCalendarDays();
}

function next() {
   //Indicates new year
   if (getTheMonth(monthNum + 1) == months[0])
      yearNum++;

   //Month after
   if ((monthNum + 1) > 11) { //December -> January
      monthNum = 0;
      $calendar.text(getTheMonth(monthNum) + ' ' + yearNum);
   } else {
      $calendar.text(getTheMonth(monthNum + 1) + ' ' + yearNum);
      monthNum++;
   }

   dateLog();
   loadCalendarDays();

}

//Returns the first weekday of the month.
function numOfDays(month, year) {
   let d = new Date(year, month + 1, 0);
   return d.getDate();
}

function loadCalendarDays() {
   $('#calendarDays').html('');

   let tmpDate = new Date(yearNum, monthNum, 0);
   //Gets how many days in the month
   let num = numOfDays(monthNum, yearNum);
   //Gets the first day of the month
   let dayOfWeek = tmpDate.getDay();

   console.log('%c loadCalendarDays():', 'color:white; font-weight:bold;');
   console.log({tmpDate, num, dayOfWeek});

   // create day prefixes before first day of the month
   if(dayOfWeek != 6){ //when month starts at Sunday, don't create
      for (let i = 0; i <= dayOfWeek; i++) {
         let d = document.createElement("div");
         $(d).attr('class', 'day blank');
         $('#calendarDays').append(d);
      }
   }
   // creates rest of the days in the month
   for (let i = 0; i < num; i++) {
      let dayNum = i + 1;
      let d = document.createElement("div");
      $(d).attr('id', 'calendarDay_' + i);
      $(d).attr('class', 'day');

      // text box inside div
      let n = document.createElement('div');
      $(n).attr('class', 'day-num');
      $(n).text(dayNum);
      $(d).append(n);
      $('#calendarDays').append(d);
   }

   var clear = document.createElement("div");
   clear.className = "clear";
   document.getElementById("calendarDays").appendChild(clear);
}