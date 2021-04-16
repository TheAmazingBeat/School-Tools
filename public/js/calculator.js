
var currentNum;
var previousNum;
var operations = [];
var $screen = $('#screenText');
$('#screenText').text('0');

//Register Keyboard Presses
document.addEventListener('keydown', function (event) {
   var $text = $screen.text();

   switch (event.key) {
      case '.':
         addNumber('.');
      case '0':
         addNumber('0');
         break;
      case '1':
         addNumber('1');
         break;
      case '2':
         addNumber('2');
         break;
      case '3':
         addNumber('3');
         break;
      case '4':
         addNumber('4');
         break;
      case '5':
         addNumber('5');
         break;
      case '6':
         addNumber('6');
         break;
      case '7':
         addNumber('7');
         break;
      case '8':
         addNumber('8');
         break;
      case '9':
         addNumber('9');
         break;
      case 'Backspace':
         if($text.length > 1){
            $screen.text($text.substr(0, $text.length - 1));
         }
         else if($text.length <= 0){
            $screen.text('0');
         }
         break;
   }
});


//Adds number to the screen
function addNumber(n) {
   var $text = $screen.text();

   if ($text.length == 1 && $text == '0')
      $screen.text(n);
   else if ($text.length >= 8)
      $screen.text($text.substr(1, $text.length) + n);
   else
      $screen.text($text + n);

   currentNum += n;
}


//Clears the Calculator
$('.clear-btn').click(function(){
   currentNum = '';
   $screen.text('0');
   console.log('Calculator Cleared!');
});


//Assigns the operation of the equation
function operator(op){
   console.log(op);
   
   if(previousNum == ''){
      previousNum = currentNum;
      currentNum = '';
   }
   else{
      solve(op, previousNum, currentNum);
   }
}
   
function solve(operator, first, second){
   let answer = 0;
   console.log('Solve');

   switch(operator){
      case 'Add':

   }
}