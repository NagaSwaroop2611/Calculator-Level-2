let screen = document.getElementById("screen");
let input = document.getElementById("input");
let btn = document.querySelectorAll(".btn");

// console.log(btn);

for(let item of btn){
  item.addEventListener("click", (e) =>{
    // console.log(e.target.textContent);
    let btnText = e.target.innerText;
    // Erase calculated on new input
    if(input.value){
      screen.value="";
      input.value="";
    }
    if(btnText==="AC"){
      // comdition to all clear the screen
      screen.value="";
      btnText="";
      // input.value="";
    }
    else if(btnText === "+/-"){
        screen.value = -returnEval(screen.value);
      }
    else{ 
      
      if(btnText==="×"){
        btnText="*";
      }
      if(btnText==="÷"){
        btnText="/";
      }
      if(btnText === "^"){
        btnText = "**";
      }
      screen.value += btnText;
    }
  });
}

// To get the eval function
const returnEval = (args) =>{
  return eval(`"use strict";${args}`);
};

function getResult(){
  input.value=screen.value;
  screen.value=returnEval(screen.value);
}

const calculatePercentage = () => {
  let result = returnEval(screen.value) / 100;
  input.value = screen.value + "%";
  screen.value = result;
};

const inverse = () => {
  let result = 1 / returnEval(screen.value);
  input.value = "1/" + screen.value;
  screen.value = result;
}

function clearExpression(){
  screen.value="";
}

function backSpace(){
  let length=screen.value.length;
  screen.value=screen.value.slice(0,length-1);
}

/*

const clearExpressionWithoutRegex = () => {
const currentExpression = screen.value;

// If expression is empty, do nothing
if (!currentExpression) return;

// Helper function to check if character is a digit
const isDigit = (char) => {
return char >= '0' && char <= '9';
};

// Helper function to check if character is an operator
const isOperator = (char) => {
return ['+', '-', '*', '/', '×', '÷', '^', '√'].includes(char);
};

// Find the last number in the expression
let i = currentExpression.length - 1;
let numberFound = false;
let numberStart = i;
let numberEnd = i;
let hasDot = false;

// Skip trailing spaces
while (i >= 0 && currentExpression[i] === ' ') {
i--;
}
numberEnd = i;

// Process the expression from right to left
while (i >= 0) {
const currentChar = currentExpression[i];

// Handle decimal point
if (currentChar === '.') {
if (hasDot) {
// Found second decimal point, stop here
i++;
break;
}
hasDot = true;
numberFound = true;
}
// Handle digits
else if (isDigit(currentChar)) {
numberFound = true;
}
// Handle operators or other characters
else if (isOperator(currentChar) || currentChar === ' ') {
if (numberFound) {
// If we found a number and hit an operator/space, stop here
i++;
break;
}
// If no number found yet, keep going
numberEnd = i - 1;
}

i--;
}

numberStart = i;

// If no number found, return original expression
if (!numberFound) {
return;
}

// Extract the parts of the expression
const beforeNumber = currentExpression.substring(0, numberStart);
const afterNumber = numberEnd + 1 < currentExpression.length
? currentExpression.substring(numberEnd + 1)
: '';

// Remove trailing spaces but keep the operator
let finalExpression = beforeNumber;
if (finalExpression.endsWith(' ')) {
finalExpression = finalExpression.trimEnd();
}

// Update the screen value
screen.value = finalExpression + afterNumber;
};

*/