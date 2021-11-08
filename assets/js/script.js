const billInput = document.querySelector('#inp-bill');
const peopleInput = document.querySelector('#inp-people');
const tips = document.querySelectorAll('.tip');
const tipPerPerson = document.querySelector('#tip-amount');
const totalPerPerson = document.querySelector('#total-amount');
const tipCustom = document.querySelector('#inp-custom');
const resetBtn = document.querySelector('#reset');
const error = document.querySelector('#error');

billInput.addEventListener('input', billInputFun);
peopleInput.addEventListener('input', peopleInputFun);

tips.forEach((tip) => {
    tip.addEventListener('click', handleClick);
});

tipCustom.addEventListener('input', tipInputFun);
resetBtn.addEventListener('click', reset);

tipPerPerson.innerHTML = '$' + (0.0).toFixed(2);
totalPerPerson.innerHTML = '$' + (0.0).toFixed(2);

let billValue = 0;
let peopleValue = 1;
let tipValue = 0.15;

function billInputFun() {
    billValue = parseFloat(billInput.value); //Aceita números boleanos
    calculateTip();
}

function peopleInputFun() {
    peopleValue = parseFloat(peopleInput.value); //Aceita números boleanos
    calculateTip();

    if (peopleValue < 1) {
        error.style.display = 'block';
        peopleInput.style.borderColor = 'indianred';
    } else {
        error.style.display = 'none';
        peopleInput.style.borderColor = '';
    }
}

function tipInputFun() {
    tipValue = parseFloat(tipCustom.value) / 100;

    tips.forEach((tip) => {
        tip.classList.remove('btn-active');
    });
    calculateTip();
}

// Seleciona o tip e transforma em porcentagem
function handleClick(event) {
    tips.forEach((tip) => {
        tip.classList.remove('btn-active');

        if (event.target.innerHTML === tip.innerHTML) {
            tip.classList.add('btn-active');

            tipValue = parseFloat(tip.innerHTML) / 100;
            console.log(tipValue);
        }
    });

    calculateTip();
}

// Calcula o valor já incluido com o a gorjeta e exibi na tela
function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue + tipAmount) / peopleValue;

        tipPerPerson.innerHTML = '$' + tipAmount.toFixed(2);
        totalPerPerson.innerHTML = '$' + total.toFixed(2);
    }
}

function reset() {
    billInput.value = '0.0';
    billInputFun();

    peopleInput.value = '1';
    peopleInputFun();

    tipCustom.value = '';
}
