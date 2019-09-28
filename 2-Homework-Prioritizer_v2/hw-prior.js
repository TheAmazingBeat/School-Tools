var hwCounter;

/*Adds inputs about homework as an item onto the list*/
function addHW(){
   var hwList = document.querySelector(".homework-list");
   /*Item in Homework List*/
   var hwItem = document.createElement("li");
   hwItem.classList.add("homework-item");

   
   /*Homework Name Input*/
      var hwInput = document.createElement("input");
      hwInput.type = "text";
      hwInput.placeholder = "Homework Name";

   /*Major or Minor Dropdown*/
      var hwType = document.createElement("select");
      hwType.classList.add("hw-type-dropdown");
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

   /*Attaching together*/
      hwItem.appendChild(hwInput);
      hwItem.appendChild(hwType);
      hwItem.appendChild(hwDate);
      hwList.appendChild(hwItem);

   hwCounter++;
}

/*removes homework-item*/
function removeHW(){
   document.querySelector(".homework-item").parentElement.removeChild(document.querySelector(".homework-item"));

   hwCounter--;
}


var homeworks[];
function storeValues(){

}


function prioritize(){
   storeValues();
}

