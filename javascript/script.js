let screen = document.getElementById("screen");
let input = document.getElementById("input");
let btn = document.querySelectorAll(".btn");

// console.log(btn);
// To get the eval function
const returnEval = (args) =>{
  return eval(`"use strict";${args}`);
};

for(let item of btn){
  item.addEventListener("click", (e) =>{
    // console.log(e.target.textContent);
    let btnText = e.target.innerText;
    // console.log(btnText);
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
        btnText = "";
      }  
    else if(btnText==="×"){
      btnText="*";
    }
    else if(btnText==="÷"){
      btnText="/";
    }
    // else if(btnText === "^"){
    //   btnText = "**";
    // }
    // else if(btnText === "√"){
    //   input.value=screen.value;
    //   screen.value=Math.sqrt(parseFloat(screen.value));
    //   // console.log(screen.value,typeof screen.value);
    //   btnText="";
    // }
    screen.value += btnText;
  });
}

function convertToEvalString(input){
  // Add spaces around operators
  // input = input.replace(/([%^()√\/+*-])/g, " $1 ");
  // console.log(input);

  // Replace power (^) with ** for exponentiation
  input = input.replace(/\^/g, "**");
  // console.log(input);

  // Replace square root (√) with Math.sqrt
  input = input.replace(/√/g, "Math.sqrt");
  // console.log(input);

  // Add parentheses for square root if not present
  input = input.replace(/Math.sqrt(\d+)/g, "Math.sqrt($1)");
  // console.log(input);

  return input;
}

// To handle CE button
function clearExpression(){
  const currentExpression = screen.value;
  let lastExpression = "";

  // Use regular expression to find the last expression
  let regex = /\b\d+(\.\d+)?\s*$/;
  let match = currentExpression.match(regex);
  console.log(regex,match);
  if (match) {
    lastExpression = match[0].trim();
    console.log(lastExpression);
  }

  // Remove the last expression from the current expression
  screen.value = currentExpression.replace(lastExpression, "").trim();
}

// To calculate the percentage
const calculatePercentage = () => {
  let result = returnEval(screen.value) / 100;
  input.value = `${screen.value}%`;
  screen.value = result;
};

// To inverse the number
const inverse = () => {
  let result = 1 / returnEval(screen.value);
  input.value = "1/" + screen.value;
  screen.value = result;
};

// Never call teh function in event listener ,because eventListener will call that function whenever event is occured. 

function backSpace(){
  let length=screen.value.length;
  screen.value=screen.value.substring(0,length-1);
}

const getResult = () =>{
  input.value = screen.value;
  screen.value = returnEval(convertToEvalString(screen.value)); 
};

