const buttons= document.querySelectorAll('.calc-buttons');
let expression= '';

buttons.forEach(btn =>{
    btn.addEventListener('click', () =>{
        
        expression= updateExpression(btn);
        updateProblemDisplay(expression);   
    })
});


function updateProblemDisplay(expression){
    const disp= document.querySelector(".problem-display");
    disp.textContent= expression;
}

function updateExpression(btn){
    expression += btn.value;
    return expression;
}