var valueCalc = 0, firstPress = true, firstCalc = true;
var sOld, vOld, vCalc, vs, symbleInRight;
const btn = [];
const click = new Audio("./assets/audio/click.mp3"); 
const ce = document.getElementById("btn-ce").addEventListener("click", () => clearAll());
const screen = document.getElementById("output");
const btn_division = document.getElementById("btn-division").addEventListener("click", () => symble('division'));
const btn_subtraction = document.getElementById("btn-subtraction").addEventListener("click", () => symble('subtraction'));
const btn_add = document.getElementById("btn-add").addEventListener("click", () => symble('add'));
const btn_x = document.getElementById("btn-x").addEventListener("click", () => symble('x'));
const btn_equal = document.getElementById("btn-equal").addEventListener("click", () => equal())

for (let i = 0; i < 10; i++) {
    btn[i] = document.getElementById(`btn-${i}`).addEventListener("click", () => WriteNumber(+i));
}

function WriteNumber(n) {

    symbleInRight = false;
    click.play();

    if(vs && firstPress){
        vCalc = n * -1;
        screen.innerText = vCalc;
        firstPress = false;
        vs = undefined;

    } else if (firstPress) {
        vCalc = n;
        screen.innerText = "";
        screen.innerText = n;
        firstPress = false;

    } else {
        vCalc += String(n);
        vCalc = Number(vCalc);
        screen.innerText += n;
    }
}

function symble(s) {

    click.play();
    if (firstPress){
        if(s === 'subtraction'){
            vs = true;
            screen.innerText = "-";
        } else {
            return
        }   
    }

    else if (firstCalc){
            vOld = vCalc;
            sOld = s;
            vCalc = 0;
            updateScreen(sOld);
            firstCalc = false;
            symbleInRight = true;

    } else {
        if (symbleInRight) {
            sOld = s;
            let c = screen.innerText.length;
            c = c - 1
            screen.innerText = screen.innerText.slice(0, c)
            updateScreen(sOld);

        } else {
            switch (sOld) {
                case 'division':
                    vOld = vOld / vCalc;
                    break;
                case 'subtraction':
                    vOld = vOld - vCalc;
                    break;
                case 'add':
                    vOld = vOld + vCalc;
                    break;
                case 'x':
                    vOld = vOld * vCalc;
                    break;
                default:
                    alert('error')
            }

            screen.innerText = vOld;
            sOld = s;
            vCalc = 0;
            updateScreen(sOld);
        }
    }
}


function updateScreen(sOlder) {

    click.play();
    symbleInRight = true;

    switch (sOlder) {
        case 'division':
            screen.innerText += "÷";
            break;
        case 'subtraction':
            screen.innerText += "-";
            break;
        case 'add':
            screen.innerText += "+";
            break;
        case 'x':
            screen.innerText += "x";
            break;
        default:
            alert('error')
    }
}

function clearAll() {
    click.play();
    vCalc = 0;
    sOld = undefined;
    vOld = undefined;
    screen.innerText = "0"
    firstPress = true;
    firstCalc = true;
}

function equal() {

    click.play();

    if (symbleInRight) {
        vCalc = vOld;
        screen.innerText = vCalc;
        vOld = undefined;
        sOld = undefined;
        symbleInRight = false;
        firstCalc = true;

    } else if(vCalc === 0 || sOld === 0){
        vOld = undefined;
        sOld = undefined;
        firstPress = true;
        firstCalc = true;
        screen.innerText = 0;
    } else {
        vCalc = Number(vCalc);
        let stringCalc = String(vCalc);
        let screenNumber = Number(screen.innerText);
        screenNumber = String(screenNumber);

        if (screenNumber.length === stringCalc.length){
            screen.innerText = screenNumber;
        }

        else {
            equalUpdate(sOld);
        }
    }
}

function equalUpdate(s) {

    click.play();

    switch (s) {
        case 'division':
            vCalc = vOld / vCalc;
            break;
        case 'subtraction':
            vCalc = vOld - vCalc;
            break;
        case 'add':
            vCalc = vOld + vCalc;
            break;
        case 'x':
            vCalc = vOld * vCalc;
            break;
        default:
            alert('error');
    }
    screen.innerText = vCalc;
    sOld = undefined;
    vOld = undefined;
    firstCalc = true;
    symbleInRight = false;
}

