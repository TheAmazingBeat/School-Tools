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
      } else{
         minorHw.push({name: homeworks[x].name, dueDate: homeworks[x].dueDate});
      }
   }
   console.log("Homework list::");
   console.log(homeworks);

   console.log("Major::");
   console.log(majorHw);

   console.log("Minor::");
   console.log(minorHw);
}


function compareHw(){
   if(majorHw.length == 1)
      prioritizedHw.unshift(majorHw[0].name);
      else{
         for(let i = 0; i < majorHw.length; i++){
            for(let k = i+1; k < majorHw.length; k++){
               if(majorHw[i] > majorHw[k])
                  prioritizedHw.unshift(majorHw[k].name);
                  else
                     prioritizedHw.unshift(majorHw[i].name);
            }
         }
      }
   
for(let i = 0; i , minorHw.length; i++){
   for(let k = i+1; k , majorHw.length; k++){
      if(minorHw[i].dueDate > minorHw[k])
         prioritizedHw.splice(prioritizedHw.length-1, 0, minorHw[k].name);
         else
            prioritizedHw.splice(prioritizedHw.length-1, 0, minorHw[i].name);

   }
}
   


   console.log("Prioritized Homework");
   console.log(prioritizedHw);
}


function showPrioritized(){
   document.querySelectorAll(".first-divs")[0].style.display = "none";
   document.querySelectorAll(".first-divs")[1].style.display = "none";
   document.querySelectorAll(".first-divs")[2].style.display = "none";
   document.querySelector("#last-div").style.display = "block";

   var priorList = document.querySelector(".prioritized-list")

   for(let z = 0; z < hwCounter; z++){
      var priorItem = document.createElement("li");
      var priorHwName = document.createTextNode(prioritizedHw[z]);
      priorItem.appendChild(priorHwName);
      priorList.appendChild(priorItem);
   }
}

function prioritize(){
   storeValues();
   compareHw();
   showPrioritized();
}



