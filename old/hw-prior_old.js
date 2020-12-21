var hwCounter = 0;
var homeworks = [];
var prioritizedHw = [];
var majorHw = [];
var minorHw = [];

/*Adds inputs about homework as an item onto the list*/
function addHW(){
   var hwList = document.querySelector(".homework-list");
   /*Item in Homework List*/
   var hwItem = document.createElement("li");
   hwItem.classList.add("homework-item");

   
   /*Homework Name Input*/
      var hwInput = document.createElement("input");
      hwInput.classList.add("hw-name");
      hwInput.type = "text";
      hwInput.placeholder = "Homework Name";

   /*Major or Minor Dropdown*/
      var hwType = document.createElement("select");
      hwType.classList.add("hw-type");
      //Minor option
         var homeworkMinor = document.createElement("option");
         homeworkMinor.label = "Minor";
         homeworkMinor.setAttribute("value", "Minor");
      //Major option
         var homeworkMajor = document.createElement("option");
         homeworkMajor.label = "Major";
         homeworkMajor.setAttribute("value", "Major");
      hwType.appendChild(homeworkMinor);
      hwType.appendChild(homeworkMajor);

   /*Due Date Input*/
      var hwDate = document.createElement("input");
      hwDate.classList.add("hw-date");
      hwDate.setAttribute("type", "date");
      var myDate = new Date().toISOString().substr(0, 10);    
      hwDate.setAttribute("value", myDate);

   /*Attaching together*/
      hwItem.appendChild(hwInput);
      hwItem.appendChild(hwType);
      hwItem.appendChild(hwDate);
      hwList.appendChild(hwItem);

   homeworks[hwCounter] = hwItem;
   hwCounter++;
   
}

/*removes homework-item*/
function removeHW(){
   document.querySelector(".homework-item").parentElement.removeChild(document.querySelector(".homework-item"));

   hwCounter--;
}


function storeValues(){
   /*Gets homework from inputs*/
   for(let x =0; x < hwCounter; x++){
      homeworks[x] = new Object();
      homeworks[x].name = document.querySelectorAll(".hw-name")[x].value;
      homeworks[x].type = document.querySelectorAll(".hw-type")[x].value;
      homeworks[x].dueDate = document.querySelectorAll(".hw-date")[x].value;

      if(document.querySelectorAll(".hw-type")[x].value == "Major"){
         majorHw.push({name: homeworks[x].name, dueDate: homeworks[x].dueDate});

         //console.log(majorHw[x]);
      } else{
         minorHw.push({name: homeworks[x].name, dueDate: homeworks[x].dueDate});

         //console.log(minorHw[x]);
      }
   }
   console.log("Homework list::");
   console.log(homeworks);

   console.log("Major::");
   console.log(majorHw);

   console.log("Minor::");
   console.log(minorHw);
}


var dueDates = [];
function sortHw(){
   for(let i = 0; i < homeworks.length; i++){
      dueDates[i] = homeworks[i].dueDate;
   }

   prioritizedHw = homeworks.sort(compareValues('dueDate'));
}

function compareValues(key, order='asc') {
   return function(a, b) {
     if(!a.hasOwnProperty(key) || 
        !b.hasOwnProperty(key)) {
        return 0; 
     }
     
     const varA = (typeof a[key] === 'string') ? 
       a[key].toUpperCase() : a[key];
     const varB = (typeof b[key] === 'string') ? 
       b[key].toUpperCase() : b[key];
       
     let comparison = 0;
     if (varA > varB) {
       comparison = 1;
     } else if (varA < varB) {
       comparison = -1;
     }
     return (
       (order == 'desc') ? 
       (comparison * -1) : comparison
     );
   };
 }
 

function showPrioritized(){
   document.querySelectorAll(".first-divs")[0].style.display = "none";
   document.querySelectorAll(".first-divs")[1].style.display = "none";
   document.querySelectorAll(".first-divs")[2].style.display = "none";
   document.querySelector("#last-div").style.display = "block";

   var priorList = document.querySelector(".prioritized-list")

   for(let z = 0; z < hwCounter; z++){
      var priorItem = document.createElement("li");
      var priorHwName = document.createTextNode("Name: " + prioritizedHw[z].name);
      var priorHwType = document.createTextNode(" Type: " + prioritizedHw[z].type);
      var priorHwDate = document.createTextNode(" Due Date: " + prioritizedHw[z].dueDate);
      priorItem.appendChild(priorHwName);
      priorItem.appendChild(priorHwType);
      priorItem.appendChild(priorHwDate);
      priorList.appendChild(priorItem);
   }
}

function prioritize(){
   storeValues();
   sortHw();
   showPrioritized();
}