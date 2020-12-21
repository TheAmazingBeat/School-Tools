var hwList = [],
   hwValues = [], 
   majorHW = [], 
   minorHW = [],
   sortedHW = [];
var hwCounter = 0;

// First three homework items
for(let i = 0; i < 3; i++){
   addHW();
}

// Today's Date
function getDateToday(){
   var date = new Date();
   var year = date.getFullYear().toString();
   var month = (date.getMonth()+1).toString();
   var day = date.getDate().toString();
   var today = year + '-' + month + '-' + day;

   return today;
}

// Creating Inputs for Homework Name, Due Date, and Homework Type
function createCheckBox(){
   // Creates -> <input class="hw-select mx-2" type="checkbox">
   
   var checkbox = document.createElement('input');
   $(checkbox).attr('class', 'hw-select mx-1 hvr-grow');
   $(checkbox).attr('type', 'checkbox');

   return checkbox;
}

function createNameInput(){
   // Creates -> <input class="hw-name" type="text" placeholder="Name">
   var nameInput = document.createElement('input');
   $(nameInput).attr('class', 'hw-name hvr-grow col-md');
   $(nameInput).attr('type', 'text');
   $(nameInput).attr('placeholder', 'Name');
   return nameInput;
}

// function createInputGroup(){
//    /* Creates this:
   
//    */
//    var div = document.createElement('div');
//    $(div).attr('class', 'col-md');
//    $(div).append(createCheckBox(), createNameInput());
//    return div;
// }

function createDateInput(){
   // Creates -> <input class="hw-date" type="date" name="duedate">
   var dateInput = document.createElement('input');
   $(dateInput).attr('class', 'hw-date hvr-grow col-md');
   $(dateInput).attr('type', 'date');
   $(dateInput).attr('name', 'duedate');
   // Sets the initial value to today's date
   $(dateInput).val(getDateToday());
   return dateInput;
}

function createTypeInput(){
   // Creates -> <select name="type" id="" class="hw-type"><option value="Minor">Minor</option><option value="Major">Major</option></select>
   var typeInput = document.createElement('select');
   $(typeInput).attr('class', 'hw-type hvr-grow col-md');
   $(typeInput).attr('name', 'type');
   // Minor in dropdown
   var minorOption = document.createElement('option');
   $(minorOption).val('Minor');
   $(minorOption).html('Minor');
   // Major in dropdown
   var majorOption = document.createElement('option');
   $(majorOption).val('Major');
   $(majorOption).html('Major');
   $(typeInput).append(minorOption, majorOption);
  
   return typeInput;
}


// Getting the value of each input
function getNameInput(index){
   return $(hwList[index]).find('.hw-name').val();
}

function getDateInput(index){
   return  $(hwList[index]).find('.hw-date').val();
}

function getTypeInput(index){
   return  $(hwList[index]).find('.hw-type').val();
}


// Add a homework item in the list
function addHW(){
   // Creates -> <li class="homework-item my-2"></li>
   var hwItem = document.createElement('li');
   $(hwItem).attr('class', 'homework-item row my-3 animate__animated animate__fadeInDown');
   $(hwItem).append(createCheckBox(), createNameInput(), createDateInput(), createTypeInput());

   hwList.unshift(hwItem);
   hwCounter++;
   $('ul.homework-list').prepend(hwItem);
}

// Removes the selected homework item(s) in the list
function removeHW(){
   if(hwCounter > 3){
      for(let i = 0; i < hwCounter; i++){
         if($(hwList[i]).find('.hw-select').is(':checked')){
            $(hwList[i]).attr('class', 'homework-item my-2 animate__animated animate__fadeOutUp');
            $(hwList[i]).remove();
            hwList.pop();
            hwCounter--;
         }
      }
   }
   else{
      $('.alert').toggle();
   }
   
   // Gets the last prepended homework item
   /*if(hwCounter > 3){
      $('ul.homework-list li:last-child').remove();
      hwList.pop();
      hwCounter--;
   }
   else{
      // alert that 3 homework items is required
   }*/
}


function getAllInput(){
   for(let i = 0; i < hwCounter; i++){
      hwValues[i] = new Object();
      hwValues[i].name = getNameInput(i);
      hwValues[i].date = getDateInput(i);
      hwValues[i].type = getTypeInput(i);

      hwList[i].name = getNameInput(i);
      hwList[i].date = getDateInput(i);
      hwList[i].type = getTypeInput(i);
   }
}

function sortByDate(array){
   for(let i = 0; i < array.length; i++){
      var min = i;
      for(let j = i+1; j < array.length; j++){
         if(new Date(array[j].date) < new Date(array[i].date))
         min = j;
      }
      if(min != i){
         var temp = array[min];
         array[min] = array[i];
         array[i] = temp;
      }
   }
}

function sortHW(){
   //Counts how many MAJOR and MINOR assignments
   for(var i = 0; i < hwCounter; i++){
      if(hwValues[i].type == 'Major'){
         majorHW.push(hwValues[i]);
      } 
      else{
         minorHW.push(hwValues[i]);
      }
   }
   // Sorts MAJOR AND MINOR assignmentsby due date
   if(minorHW.length > 0){
      sortByDate(minorHW);
      console.log('Minor Homeworks :: ');
      console.log(minorHW);
   }
   if(majorHW.length > 0){
      sortByDate(majorHW);
      console.log('Major Homeworks :: ');
      console.log(majorHW);
   }

   // New array of Major Homeworks + Minor Homeworks
   sortedHW = majorHW.concat(minorHW);

   for(let i = 0; i < hwCounter; i++){
      var firstMajor;
      if(sortedHW[i].type == 'Major')
         firstMajor = sortedHW[i];
      if(sortedHW[i].type == 'Minor'){
         /*
          * If there are more minor than major and
          * the major is due in 4 days then the minor comes first
          * 4 days = 345600000 milliseconds
          */
         if((minorHW.length > majorHW.length) && ((new Date(firstMajor.date) - new Date(sortedHW[i].date)) >= 345600000)){
           var temp = sortedHW[i];
           sortedHW[i] = firstMajor;
           sortedHW[sortedHW.indexOf(firstMajor)] = temp;
         }
      }
   }
   
}

function showPrioritized(){

}

function prioritize(){
   hwValues = [],
   majorHW = [],
   minorHW = [];
   getAllInput();
   sortHW();
}