//jshint esversion:6

const months = ['January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'
];

let d = new Date();
let currMonth = d.getMonth();
let currYear = d.getFullYear();
let monthNum = d.getMonth();
let yearNum = d.getFullYear();
let $calendar = $('#monthYear');

$(document).ready(function () {
   $calendar.text(getRealMonth() + ' ' + yearNum);
   loadCalendarDays();
});

function getRealMonth() {
   return getTheMonth(d.getMonth());
}

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


   if ((monthNum - 1) < 0) {
      monthNum = 11;
      $calendar.text(getTheMonth(monthNum) + ' ' + yearNum);
   } else {
      $calendar.text(getTheMonth(monthNum - 1) + ' ' + yearNum);
      monthNum--;
   }

   loadCalendarDays();
}

function next() {
   //Indicates new year
   if (getTheMonth(monthNum + 1) == months[0])
      yearNum++;


   if ((monthNum + 1) > 11) {
      monthNum = 0;
      $calendar.text(getTheMonth(monthNum) + ' ' + yearNum);
   } else {
      $calendar.text(getTheMonth(monthNum + 1) + ' ' + yearNum);
      monthNum++;
   }

   loadCalendarDays();

}

//Returns the first weekday of the month.
function numOfDays(month, year) {
   let d = new Date(year, month + 1, 0);
   return d.getDate();
}

function loadCalendarDays() {
   $('#calendarDays').html('');

   let tmpDate = new Date(currYear, currMonth, 0);
   let num = numOfDays(currMonth, currYear);
   //Gets the first day of the month
   let dayofweek = tmpDate.getDay();

   // create day prefixes before first day of the month
   for (let i = 0; i <= dayofweek; i++) {
      let d = document.createElement("div");
      $(d).attr('class', 'day blank');
      $('#calendarDays').append(d);
   }

   // creates rest of the days in the month
   for (let i = 0; i < num; i++) {
      let dayNum = i + 1;
      let d = document.createElement("div");
      $(d).attr('id', 'calendarDay_' + i)
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