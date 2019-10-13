var hwCounter = 0;
var homeworks = [],
    prioritizedHw = [],
    majorHw = [],
    minorHw = [],
    priorMajor = [],
    priorMinor = [];

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
      var myDate = new Date().toISOString().substr(0,10);
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
   let lastItem = document.querySelectorAll(".homework-item").length - 1;
   let item = document.querySelectorAll(".homework-item");
   item[lastItem].parentElement.removeChild(item[lastItem]);
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
         majorHw.push({name: homeworks[x].name, type: "Major", dueDate: homeworks[x].dueDate}); //stores major homeworks
         //console.log(majorHw[x]);
      } else{
         minorHw.push({name: homeworks[x].name, type: "Minor", dueDate: homeworks[x].dueDate}); //stores minor homeworks
         //console.log(minorHw[x]);
      }
   
for(let i = 0; i , minorHw.length; i++){
   for(let k = i+1; k , majorHw.length; k++){
      if(minorHw[i].dueDate > minorHw[k])
         prioritizedHw.splice(prioritizedHw.length-1, 0, minorHw[k].name);
         else
            prioritizedHw.splice(prioritizedHw.length-1, 0, minorHw[i].name);

   }
   console.log("Homework list::");
   console.log(homeworks);

   console.log("Major::");
   console.log(majorHw);

   console.log("Minor::");
   console.log(minorHw);
}
   


function sortHw(){
   majorHw.sort(compareHw);
   minorHw.sort(compareHw);
   prioritizedHw = majorHw.concat(minorHw);
}


 function compareHw(a, b){
    var dateA = a.dueDate;
    var dateB = b.dueDate;

    if(dateA > dateB){return 1;}
      else if(dateB > dateA){return -1;}

      return 0;
 }
 

function showPrioritized(){
   /*hides all user inputs*/
   for(let x = 0; x < document.querySelectorAll(".first-divs").length; x++){
      document.querySelectorAll(".first-divs")[x].style.display = "none";
   }

   /*shows the table*/
   document.querySelector("#last-div").style.display = "block";


   var priorList = document.querySelector(".prioritized-list")
   var someDate;

   for(let z = 0; z < hwCounter; z++){
      var row = document.createElement("tr"),
      dataName = document.createElement("td"),
      dataType = document.createElement("td"),
      dataDate = document.createElement("td"),
   
      priorHwName = document.createTextNode(prioritizedHw[z].name),
      priorHwType = document.createTextNode(prioritizedHw[z].type),
      //reformats the date to MM/DD/YYYY
      someDate = prioritizedHw[z].dueDate;
      someDate = someDate.substr(5, someDate.length)+ "-" + someDate.substr(0,4);
      priorHwDate = document.createTextNode(someDate);

      
      /*attaches name, type, date to cells in row*/
      dataName.appendChild(priorHwName);
      dataType.appendChild(priorHwType);
      dataDate.appendChild(priorHwDate);
      /*attaches the cells to the row*/
      row.appendChild(dataName);
      row.appendChild(dataType);
      row.appendChild(dataDate);
      /*inserts row to the table*/
      priorList.appendChild(row);
   }
}

function prioritize(){
   storeValues();
   sortHw();
   showPrioritized();
}