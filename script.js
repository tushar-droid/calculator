const buttons= document.querySelectorAll('.calc-buttons');
let expression= '';
let operand1=0;
let operand2=0;
let operator= '';
let res= 0;
buttons.forEach(btn =>{
    btn.addEventListener('click', () =>{

        onKeyPress(btn);
        updateProblemDisplay(expression);   
        updateSolutionDisplay(res);
    })
});


function onKeyPress(btn){

    if(btn.classList.contains('operator')){
        if(checkIsResEmpty()){
            if(btn.value=='/' || btn.value=='X'|| btn.value=='%'){
                expression = `\u00A0`;
                return;
            }

            setOperator(btn);
            expression= updateExpression(btn);
        }
        else{
            expression = res;
            setOperator(btn);
            expression= updateExpression(btn);
        }

    }
    else if(btn.value==='ac'){
        expression = `\u00A0`;
        res=0;
        enableOperators();
    }
    else if (btn.value==='Backspace'){
        expression= expression.slice(0,-1);
        if(expression.length==0){
            expression = `\u00A0`;
            enableOperators();
        }
    }
    else if(btn.value ==='='){
        expression= expression.trim();
        operand1=parseFloat(expression);
        let remain= expression.replace(operand1, '');
        operand2= parseFloat(remain.slice(1,));
        res= operate(operand1, operand2, operator);
        enableOperators();

        if(isNaN(res)){
            res=0;
        }
        
    }
    else if(btn.value=='%'){
        expression= expression.trim();
        res= percent(parseFloat(expression),100);
        enableOperators();
    }
    else{
        expression= updateExpression(btn);
    }

}



function checkIsResEmpty(){
    return res=='0';
}



document.addEventListener('keydown', (e) =>{
    let found=false;
    let pressed_key=''
    if(e.key=='Enter'){
        pressed_key="=";
    }
    else if(e.key =='*'){
        pressed_key='X';
    }
    else{
        pressed_key=e.key;
    }
    buttons.forEach(btn =>{
        if(btn.value==pressed_key){
            onKeyPress(btn);
            found=true;
        }
        
    });
    if(found==true){
        updateProblemDisplay(expression);   
        updateSolutionDisplay(res);
    }
    
})





function updateProblemDisplay(expression){
    const disp= document.querySelector(".problem-display");
    disp.textContent= expression;
}
function updateSolutionDisplay(res){
    const disp= document.querySelector(".solution-display");
    if(isNaN(res)){
        disp.textContent=0;
    }
    else{
        disp.textContent=res;
    }
}



function updateExpression(btn){
    expression += btn.value;
    return expression;
}

function setOperator(btn){
    operator= btn.value;
    disableOperators();

}

function disableOperators(){
    const operators= document.querySelectorAll('.operator');
    operators.forEach(op => op.disabled=true)
};

function enableOperators(){
    const operators= document.querySelectorAll('.operator');
    operators.forEach(op => op.disabled=false)
};


function operate(operand1, operand2, operator){
    if(operator==='+'){
        return add(operand1, operand2);
    }
    else if(operator==='-'){
        return substract(operand1, operand2);
    }
    else if(operator==='X'){
        return multiply(operand1, operand2);
    }
    else if(operator==='/'){
        return divide(operand1, operand2);
    }
}



function add(a,b){
    return Math.round((a+b)*10000)/10000;
}


function substract(a,b){
    return Math.round((a-b)*10000)/10000;
}

function multiply(a,b){
    return Math.round((a*b)*10000)/10000;
}

function divide(a,b){
    return Math.round((a/b)*10000)/10000;
}

function percent(a,b){
    return a/b;
}
