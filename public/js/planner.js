//jshint esversion:6

const months = ['January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'
];
let d = new Date();
let monthNum = d.getMonth();
let yearNum = d.getFullYear();
let $calendar = $('#monthYear');
let animateDelay = 2000;
let days;


function dateLog() {
   console.log('%c Date:', 'color: green; font-weight: bold;');
   console.log({
      monthNum,
      yearNum
   });
}


// Beginning at the current month and year
$(document).ready(function () {
   $calendar.text(getTheMonth(monthNum) + ' ' + yearNum);
   dateLog();
   loadCalendarDays();
});


// Get month from string array
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
   animateDelay = 0;
   // Indicates year before
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

   $calendar.attr('class', 'animate__animated animate__fadeInLeft');
   $calendar.on('animationend', function () {
      $calendar.attr('class', '');
   });

   dateLog();
   loadCalendarDays();
}

function next() {
   animateDelay = 0;
   // Indicates new year
   if (getTheMonth(monthNum + 1) == months[0])
      yearNum++;

   // Month after
   if ((monthNum + 1) > 11) { //December -> January
      monthNum = 0;
      $calendar.text(getTheMonth(monthNum) + ' ' + yearNum);
   } else {
      $calendar.text(getTheMonth(monthNum + 1) + ' ' + yearNum);
      monthNum++;
   }

   $calendar.attr('class', 'animate__animated animate__fadeInRight');
   $calendar.on('animationend', function(){
      $calendar.attr('class','');
   });

   dateLog();
   loadCalendarDays();

}

// Returns the number of days in the month
function numOfDays(month, year) {
   let d = new Date(year, month + 1, 0);
   return d.getDate();
}


function loadCalendarDays() {
   $('#calendarDays').html('');
   days = 0;

   let tmpDate = new Date(yearNum, monthNum, 1);
   // Gets how many days in the month
   let num = numOfDays(monthNum, yearNum);
   // Gets the first day of the month
   let dayOfWeek = tmpDate.getDay();
   

   console.log('%c loadCalendarDays():', 'color:white; font-weight:bold;');
   console.log({
      tmpDate,
      num,
      dayOfWeek
   });

   // create day prefixes before first day of the month
   for (let i = dayOfWeek; i > 0; i--) {
      createDayCells('blank-begin', i, tmpDate);
      days++;
   }
   // creates rest of the days in the month
   for (let i = 0; i < num; i++) {
      createDayCells('real', i);
      days++;
   }
   // create blank days after last day of the month
   let daysLeft;
   if(days > 35){
      daysLeft = 42-days;
   }
   else{
      daysLeft = 35 - days;
   }
   if(days != 35){
      for(let i = 0; i < daysLeft; i++){
         createDayCells('blank-end', i);
      }
   }

   var clear = document.createElement("div");
   clear.className = "clear";
   document.getElementById("calendarDays").appendChild(clear);
}

// Makes days in the calendar
function createDayCells(type, index, date){
   let d = document.createElement('div');
   $(d).css('animation-delay', animateDelay.toString() + 'ms');

   //blank cells before the current month
   if(type == 'blank-begin'){
      $(d).attr('class', 'day blank animate__animated animate__fadeIn');
      
      // text box inside div
      let daysBefore = numOfDays(monthNum-1, yearNum)-(index-1);
      let n = document.createElement('div');
      $(n).attr('class', 'day-num');
      $(n).text(daysBefore);
      $(d).append(n);
      
   }

   //blank cells after the current month
   if (type == 'blank-end') {
      $(d).attr('class', 'day blank animate__animated animate__fadeIn');

      // text box inside div
      let daysAfter = index+1;
      let n = document.createElement('div');
      $(n).attr('class', 'day-num');
      $(n).text(daysAfter);
      $(d).append(n);
   }

   //days in the current month
   if(type == 'real'){
      $(d).attr('id', 'calendarDay_' + index);
      $(d).attr('class', 'day animate__animated animate__fadeIn');

      // text box inside div
      let dayNum = index + 1;
      let n = document.createElement('div');
      $(n).attr('class', 'day-num');
      $(n).text(dayNum);
      $(d).append(n);      
   }

   $('#calendarDays').append(d);
   animateDelay += 40;
}



