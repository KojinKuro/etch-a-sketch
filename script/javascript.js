let sliderValue = 2;
let historyHead = 0;
let mouseDown = false;
let undoArray = [];

//magic color code
let currentColor = document.querySelector(`#color-picker`).value;
let colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener("change", e => currentColor = e.target.value);



//drawing function
document.body.onmousedown = () => { mouseDown = true; }
document.body.onmouseup = () => { mouseDown = false; }
//undo function
document.body.onkeyup = (e) => {
    e.preventDefault();
    if (e.code === 'KeyZ' && e.ctrlKey) { undoCurrentState(); }
}

listenForSlider();
createGrid(sliderValue,sliderValue);

function createGrid(x,y) {
    const drawGridNode = document.querySelector(`.draw-grid`);
    const drawRowNode = document.createElement(`div`);
    drawRowNode.classList.add('draw-row');

    for (let i=0; i < x; i++) {
        let drawBoxDiv = document.createElement(`div`);
        drawBoxDiv.classList.add(`draw-box`);
        drawRowNode.appendChild(drawBoxDiv);
    }
    for (let i=0; i < y; i++) {
        const cloneNode = drawRowNode.cloneNode(true);
        drawGridNode.appendChild(cloneNode);
    } 

    // saveCurrentState();
    listenForDraw();
}

function clearGrid() {
    const drawGridNode = document.querySelector(`.draw-grid`);
    while (drawGridNode.lastElementChild) {
        drawGridNode.removeChild(drawGridNode.lastElementChild);
    }
}

function listenForSlider() {
    const gridValueNode = document.querySelector(`.grid-value`);
    const slider = document.querySelector(`.slider`);

    slider.oninput = function() {
        clearGrid();
        gridValueNode.innerText = `${this.value} x ${this.value}`;
        createGrid(this.value,this.value);
    }
}

function listenForDraw() {
    let drawNodes = document.querySelectorAll(`.draw-box`);
    drawNodes.forEach(node => {
        node.addEventListener('mouseover', changeColor);
        node.addEventListener('mousedown', changeColor);
    });
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    // let randVar = randomRGB();
    e.target.style = `background-color: ${currentColor};`;
}

function randomRGB() {
    const RANDOM_NUMBER = 256;
    let num1 = Math.floor(Math.random() * RANDOM_NUMBER);
    let num2 = Math.floor(Math.random() * RANDOM_NUMBER);
    let num3 = Math.floor(Math.random() * RANDOM_NUMBER);
    return `rgb(${num1},${num2},${num3})`;
}

function saveCurrentState() {
    let boardArray = [];
    const rowNodes = document.querySelectorAll(`.draw-row`);
    rowNodes.forEach(row => boardArray.push(row.cloneNode(true)));

    if (boardArray == undoArray[undoArray.length-1]) { console.log('same state found returning'); return; }

    console.log('saved state');
    const UNDO_LENGTH = 10;
    undoArray.push(boardArray);

    while (!(undoArray.length <= UNDO_LENGTH)) { undoArray.shift(); };
}

function undoCurrentState() {
    if (!undoArray.length) return;

    clearGrid();
    console.log(`undoing ${undoArray.length} to ${undoArray.length-1}`);
    const lastState = undoArray.pop();
    const drawGridNode = document.querySelector(`.draw-grid`);
    lastState.forEach(node => drawGridNode.appendChild(node));

    listenForDraw();
}