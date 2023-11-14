let sliderValue = 16;

sliderChange();
createGrid(sliderValue,sliderValue);

function createGrid(x,y) {
    const drawGridNode = document.querySelector(`.draw-grid`);

    const drawRowNode = document.createElement(`div`);
    drawRowNode.classList.add('draw-row');

    const drawBoxDiv = document.createElement(`div`);
    drawBoxDiv.classList.add(`draw-box`);
    for (let i=0; i < x; i++) {
        const cloneNode = drawBoxDiv.cloneNode(true);
        drawRowNode.appendChild(cloneNode); 
    }
    for (let i=0; i < y; i++) {
        const cloneNode = drawRowNode.cloneNode(true);
        drawGridNode.appendChild(cloneNode);
    }

    hoverDraw();
}

function clearGrid() {
    const drawGridNode = document.querySelector(`.draw-grid`);
    while (drawGridNode.lastElementChild) {
        drawGridNode.removeChild(drawGridNode.lastElementChild);
    }
}

function sliderChange() {
    const gridValueNode = document.querySelector(`.grid-value`);
    const slider = document.querySelector(`.slider`);

    slider.oninput = function() {
        clearGrid();
        gridValueNode.innerText = this.value + ' x ' + this.value;
        createGrid(this.value,this.value);
    }
}

function hoverDraw() {
    const drawNodes = document.querySelectorAll(`.draw-box`);

    drawNodes.forEach((drawNode) => {
        drawNode.addEventListener('mouseover', () => {
            let randVar = randomRGB();
            drawNode.style = `background-color: ${randVar};`;
        });
    });
}

function randomRGB() {
    const RANDOM_NUMBER = 256;
    let num1 = Math.floor(Math.random() * RANDOM_NUMBER);
    let num2 = Math.floor(Math.random() * RANDOM_NUMBER);
    let num3 = Math.floor(Math.random() * RANDOM_NUMBER);
    return `rgb(${num1},${num2},${num3})`;
}