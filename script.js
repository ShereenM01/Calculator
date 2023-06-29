const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "/", "*", "+", "-", "="];
let output = "";

function indexOfOperator(value) {

    let indexOperatorAdd = value.indexOf("+");
    let indexOperatorSub = value.indexOf("-");
    let indexOperatorMul = value.indexOf("*");
    let indexOperatorDiv = value.indexOf("/");

    if (indexOperatorAdd !== -1) {
        return indexOperatorAdd;
    }
    else if (indexOperatorSub !== -1) {
        return indexOperatorSub;
    }
    else if (indexOperatorMul !== -1) {
        return indexOperatorMul;
    }
    else if (indexOperatorDiv !== -1) {
        return indexOperatorDiv;
    }
    else {
        return -1;
    }
}

function evaluate(value) {
    console.log("evaluate", value);

    if (value === "(" || value === ")")
        return ""; // nothing was found in the bracket == ""
    
    value = value.toString();

    let indexOperatorDiv = value.indexOf("/");
    let indexOperatorMul = value.indexOf("*");
    let indexOperatorAdd = value.indexOf("+");
    let indexOperatorSub = value.indexOf("-");

    let indexBracketOpen = value.indexOf("(");
    let indexBracketClose = value.indexOf(")");
    

    if (indexBracketOpen === -1 && indexBracketClose !== -1) {
        return evaluate("(" + value);
    }
    else if (indexBracketOpen !== -1) {
        if (indexBracketClose === -1){ 
            value += ")";
            indexBracketClose = value.length;
        }
        let output1 = value.substring(indexBracketOpen + 1, indexBracketClose);
        return evaluate(value.substring(0, indexBracketOpen) + evaluate(output1) + value.substring(indexBracketClose+1, value.length));
    }
    else if (indexOperatorDiv !== -1) {
        
        let before = value.substring(0, indexOperatorDiv); 
        let after = value.substring(indexOperatorDiv+1, value.length); 

        let beforeOperatorIndex = indexOfOperator(before);
        let afterOperatorIndex = indexOfOperator(after);

        if (beforeOperatorIndex === -1 && afterOperatorIndex === -1) {
            return evaluate(parseFloat(evaluate(before)) / parseFloat(evaluate(after)));
        }
        else if (beforeOperatorIndex === -1 && afterOperatorIndex !== -1) { 
            return evaluate((parseFloat(before) / after.substring(0, afterOperatorIndex)) + after.substring(afterOperatorIndex, after.length));
        }
        else if (beforeOperatorIndex !== -1 && afterOperatorIndex === -1) { 
            return evaluate(before.substring(0, beforeOperatorIndex+1) + (parseFloat(before.substring(beforeOperatorIndex, before.length)) / parseFloat(after)));
        }
        else {
            
            return evaluate(before.substring(0, beforeOperatorIndex+1) + (parseFloat(before.substring(beforeOperatorIndex+1, before.length)) / parseFloat(after.substring(0, afterOperatorIndex))) + after.substring(afterOperatorIndex, after.length));
        }
    }
    else if (indexOperatorMul !== -1){    
       
        let before = value.substring(0, indexOperatorMul); 
        let after = value.substring(indexOperatorMul+1, value.length); 

        let beforeOperatorIndex = indexOfOperator(before);
        let afterOperatorIndex = indexOfOperator(after);

        if (beforeOperatorIndex === -1 && afterOperatorIndex === -1) {
    
            return evaluate(parseFloat(evaluate(before)) * parseFloat(evaluate(after)));
        }
        else if (beforeOperatorIndex === -1 && afterOperatorIndex !== -1) {
            
            return evaluate((parseFloat(before) * after.substring(0, afterOperatorIndex)) + after.substring(afterOperatorIndex, after.length));
        }
        else if (beforeOperatorIndex !== -1 && afterOperatorIndex === -1) { 
            
            return evaluate(before.substring(0, beforeOperatorIndex+1) + (parseFloat(before.substring(beforeOperatorIndex, before.length)) * parseFloat(after)));
        }
        else { 
            console.log(444);
            return evaluate(before.substring(0, beforeOperatorIndex+1) + (parseFloat(before.substring(beforeOperatorIndex+1, before.length)) * parseFloat(after.substring(0, afterOperatorIndex))) + after.substring(afterOperatorIndex, after.length));
        }
        
    }
    else if (indexOperatorAdd != -1) {
       
        let before = value.substring(0, indexOperatorAdd); 
        let after = value.substring(indexOperatorAdd+1, value.length); 

        let beforeOperatorIndex = indexOfOperator(before);
        let afterOperatorIndex = indexOfOperator(after);

        if (beforeOperatorIndex === -1 && afterOperatorIndex === -1) {
           
            return evaluate(parseFloat(evaluate(before)) + parseFloat(evaluate(after)));
        }
        else if (beforeOperatorIndex === -1 && afterOperatorIndex !== -1) { 
        
            return evaluate((parseFloat(before) + after.substring(0, afterOperatorIndex)) + after.substring(afterOperatorIndex, after.length));
        }
        else if (beforeOperatorIndex !== -1 && afterOperatorIndex === -1) { 
            
            return evaluate(before.substring(0, beforeOperatorIndex+1) + (parseFloat(before.substring(beforeOperatorIndex, before.length)) + parseFloat(after)));
        }
        else { 
            
            return evaluate(before.substring(0, beforeOperatorIndex+1) + (parseFloat(before.substring(beforeOperatorIndex+1, before.length)) + parseFloat(after.substring(0, afterOperatorIndex))) + after.substring(afterOperatorIndex, after.length));
        }

    }
    else if (indexOperatorSub !== -1 && indexOperatorSub !== 0) {
        
        let before = value.substring(0, indexOperatorSub); 
        let after = value.substring(indexOperatorSub+1, value.length); 

        let beforeOperatorIndex = indexOfOperator(before);
        let afterOperatorIndex = indexOfOperator(after);

        if (beforeOperatorIndex === -1 && afterOperatorIndex === -1) {
            
            return evaluate(parseFloat(evaluate(before)) - parseFloat(evaluate(after)));
        }
        else if (beforeOperatorIndex === -1 && afterOperatorIndex !== -1) { 
            return evaluate((parseFloat(before) - after.substring(0, afterOperatorIndex)) + after.substring(afterOperatorIndex, after.length));
        }
        else if (beforeOperatorIndex !== -1 && afterOperatorIndex === -1) { 
            return evaluate(before.substring(0, beforeOperatorIndex+1) + (parseFloat(before.substring(beforeOperatorIndex, before.length)) - parseFloat(after)));
        }
        else { 
            return evaluate(before.substring(0, beforeOperatorIndex+1) + (parseFloat(before.substring(beforeOperatorIndex+1, before.length)) - parseFloat(after.substring(0, afterOperatorIndex))) + after.substring(afterOperatorIndex, after.length));
        }
    }
    else {
        return value;
    }
    
}

//function to calculate based on button clicked on.
const calculate = (buttonValue) => {
    let myDisplay = document.getElementById("myDisplay");
    
    if (buttonValue === "=" && output !== "") {
        //if output has '%', replace with '/100' before evaluating.
        output = evaluate(output.replace("%", "/100"));
    }
    else if (buttonValue === "Ac") {
        output = "";
    }
    else if (buttonValue === "Del") {
        //if del button is clicked, remove the last character from the output.
        output = output.toString().slice(0,-1);
    }
    else if (buttonValue === "(" && ")") {
        //anything before the bracket is number then add mul(*)
        if (output.length > 0 && !isNaN(output.charAt(output.length - 1))) {
            output += "*";
        }
        output += buttonValue;
    }
    else{
        //if output is empty and button is specialChars then return
        if (output ==="" && specialChars.includes(buttonValue)) return;
            output += buttonValue;
    }

    myDisplay.value = output;
};
buttons.forEach((button)=>{
    button.addEventListener("click", (e) => calculate(e.target.textContent));
});

