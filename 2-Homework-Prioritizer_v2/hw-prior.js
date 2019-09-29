var hwCounter = 0;

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


var homeworks = [];

function storeValues(){
   for(let x =0; x < hwCounter; x++){
      homeworks[x] = new Object();
      homeworks[x].name = document.querySelectorAll(".hw-name")[x].value;
      homeworks[x].type = document.querySelectorAll(".hw-type")[x].value;
      homeworks[x].dueDate = document.querySelectorAll(".hw-date")[x].value;
   }
   console.log(homeworks);
}


var prioritizedHw = [];

function compareHw(){
   for(let i = 0; i < hwCounter; i++){
      if(homeworks[i].type == "Major"){
         prioritizedHw.unshift(homeworks[i].name);
      } else{
         prioritizedHw.push(homeworks[i].name);
      }
   }
   console.log(prioritizedHw);
}

function prioritize(){
   storeValues();
   compareHw();
   showPrioritized();
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

