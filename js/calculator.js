var firstArr = [], secondArr = [];
var firstDigit = "", secondDigit = "", which = "first";
var operate = "";

function addDigit(num){

    switch(num){
        case 0:
            if(which == "first")
                firstArr.push(0);
            else if(which == "second")
                secondArr.push(0)

            break;
        case 1:
            if(which == "first")
                firstArr.push(1);
            else if(which == "second")
                secondArr.push(1)
            break;
        case 2:
            if(which == "first")
                firstArr.push(2);
            else if(which == "second")
                secondArr.push(2)
            break;
        case 3:
            if(which == "first")
                firstArr.push(3);
            else if(which == "second")
                secondArr.push(3)
            break;
        case 4:
            if(which == "first")
                firstArr.push(4);
            else if(which == "second")
                secondArr.push(4)
            break;
        case 5:
            if(which == "first")
                firstArr.push(5);
            else if(which == "second")
                secondArr.push(5)
            break;
        case 6:
            if(which == "first")
                firstArr.push(6);
            else if(which == "second")
                secondArr.push(6)
            break;
        case 7:
            if(which == "first")
                firstArr.push(7);
            else if(which == "second")
                secondArr.push(7)
            break;
        case 8:
            if(which == "first")
                firstArr.push(8);
            else if(which == "second")
                secondArr.push(8)
            break;
        case 9:
            if(which == "first")
                firstArr.push(9);
            else if(which == "second")
                secondArr.push(9)
            break;
        case ".":
            if(which == "first")
                firstArr.push(".");
            else if(which == "second")
                secondArr.push(".");
    }


    if(which == "first"){
        firstDigit = firstArr.join("");
        document.querySelector("#screen").innerHTML = firstDigit;
    }
    else if(which == "second"){
        secondDigit = secondArr.join("");
        document.querySelector("#screen").innerHTML = secondDigit;
    }
    
}

function operation(operator){
    which = "second";

    switch(operator){
        case "add":
            document.querySelector("#screen").innerHTML = " + ";
            operate = "add";
            break;
        case "subtract":
            document.querySelector("#screen").innerHTML = " - ";
            operate = "subtract";
            break;
        case "multiply":
            document.querySelector("#screen").innerHTML = " &centerdot; ";
            operate = "multiply";
            break;
        case "divide":
            document.querySelector("#screen").innerHTML = " &divide ";
            operate = "divide";
            break;
    }
}

function result(){
    // firstDigit = parseFloat(firstDigit);
    // secondDigit  = parseFloat(secondDigit);

    switch(operate){
        case "add":
            return parseFloat(firstDigit) + parseFloat(secondDigit);
        case "subtract":
            return firstDigit - secondDigit;
        case "multiply":
            return firstDigit * secondDigit;
        case "divide":
            return firstDigit / secondDigit;
    }
}

function showAnswer(){
    document.querySelector("#screen").innerHTML = result();
}