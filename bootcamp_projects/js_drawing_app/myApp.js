// 1. Read the initial code below and understand what it does.
// Write in comments to explain each part of the code.


// 2. Update the code below to complete the requirements of the application.


let myCanvas = createCanvas({
    rows: 50,
    columns: 100,
    size: 10
})

const container = document.getElementById('container')
container.appendChild(myCanvas)
let currentColor = 'cyan';
let mouseMoving = false;
let colorBlotches = []
let brushSize = 1

let newRows = 50
let newCols = 100
let isResized = false;

function resizeButton() {
    const button = document.createElement('button')
    button.innerText = 'Resize Canvas';
    button.style.margin = '10px'

    button.addEventListener('click', () => {
        const rowsInput = prompt('Enter number of rows:');
        const colsInput = prompt('Enter number of columns:');

        const rows = parseInt(rowsInput)
        const cols = parseInt(colsInput)

        if (!isNaN(rows) && !isNaN(cols)) {

            newRows = rows;
            newCols = cols;
            isResized = true;
            container.removeChild(myCanvas)
            const newCanvas = createCanvas({ rows: newRows, columns: newCols, size: 10 });
            myCanvas = newCanvas
            inheritEventListeners(myCanvas);
            container.insertBefore(myCanvas, palette)
        }
    });

    return button;
}
container.insertBefore(resizeButton(), myCanvas)

function inheritEventListeners(canvas) {
    canvas.addEventListener('mousemove', (event) => {
        if (mouseMoving && event.target.classList.contains('grid-cell')) {
            updateBrushSize(event.target);
        }
    })

    canvas.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('grid-cell')) {
            mouseMoving = true;
            updateBrushSize(event.target);
            event.preventDefault();
        }
    })
    canvas.addEventListener('mouseup', () => {
        mouseMoving = false
    })

    canvas.addEventListener('selectstart', (event) => {
        event.preventDefault();
    })
}



function createCanvas({ rows, columns, size }) {
    const myCanvas = document.createElement('div')
    myCanvas.style.display = 'grid';
    myCanvas.style.gridTemplateColumns = `repeat(${columns}, ${size}px)`
    myCanvas.style.gridTemplateRows = `repeat(${rows}, ${size}px)`
    myCanvas.style.width = `${columns * size}px`

    for (let i = 0; i < rows * columns; i++) {
        const square = generateSquare(size)
        square.style.backgroundColor = "white";
        square.style.borderRadius = `4px`
        square.addEventListener('click', () => handleSquareClick(square));

        myCanvas.appendChild(square)
    }


    return myCanvas
}

function generateSquare(size) {
    const square = document.createElement('div')
    square.style.border = '1px solid black';
    square.style.height = `${size}px`;
    square.style.width = `${size}px`;
    square.classList.add('grid-cell')
    return square
}

function handleSquareClick(square) {
    square.style.backgroundColor = currentColor;
}

myCanvas.addEventListener('mousemove', (event) => {
    if (mouseMoving && event.target.classList.contains('grid-cell')) {
        updateBrushSize(event.target);
    }
})

myCanvas.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('grid-cell')) {
        mouseMoving = true;
        updateBrushSize(event.target);
        event.preventDefault();
    }
})
myCanvas.addEventListener('mouseup', () => {
    mouseMoving = false
})

myCanvas.addEventListener('selectstart', (event) => {
    event.preventDefault();
})


function createPalette() {
    const palette = document.createElement('div');
    palette.style.display = 'flex';
    const colors = ['cyan', 'magenta', 'yellow', 'white', 'green', 'red', 'purple', 'black', 'blue', 'indigo', 'orange'];

    colors.forEach(color => {
        const colorBlotch = document.createElement('div');
        colorBlotch.style.backgroundColor = color;
        colorBlotch.style.width = '40px';
        colorBlotch.style.height = '40px';
        colorBlotch.style.borderRadius = '50%';
        colorBlotch.style.margin = '10px';
        colorBlotch.style.border = '2px solid white';
        colorBlotch.style.cursor = 'pointer';
        colorBlotch.style.transition = 'transform 0.2s, box-shadow 0.2s';


        colorBlotch.addEventListener('click', () => {
            currentColor = color;
            updateCurrentColorDisplay(colorBlotch, color);
        });
        colorBlotches.push(colorBlotch)
        palette.appendChild(colorBlotch);


    })
    palette.appendChild(createCustomBlotch());
    return palette
}

function updateCurrentColorDisplay(selectedBlotch, color) {

    for (const colorBlotch of colorBlotches) {
        colorBlotch.style.transform = '';
        colorBlotch.style.boxShadow = '';
        colorBlotch.style.borderWidth = '2px';
    }


    selectedBlotch.style.transform = 'scale(1.1)';
    selectedBlotch.style.boxShadow = `0 0 10px ${color}`;
    selectedBlotch.style.borderWidth = '4px';

}

const palette = createPalette();
container.appendChild(palette);

function createCustomBlotch() {
    const wrapper = document.createElement('div')
    wrapper.style.position = 'relative'

    const customBlotch = document.createElement('div')
    customBlotch.style.width = '40px';
    customBlotch.style.height = '40px';
    customBlotch.style.borderRadius = '50%';
    customBlotch.style.margin = '10px';
    customBlotch.style.marginLeft = '270px';
    customBlotch.style.border = '2px solid white';
    customBlotch.style.cursor = 'pointer';
    customBlotch.style.transition = 'transform 0.2s, box-shadow 0.2s';
    customBlotch.style.backgroundColor = '#ffffff'



    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.style.opacity = '0';
    colorInput.style.position = 'absolute';
    colorInput.style.pointerEvents = 'none';


    customBlotch.addEventListener('click', () => {
        colorInput.click()
    })

    colorInput.addEventListener('input', (event) => {
        const chosenColor = event.target.value;
        customBlotch.style.backgroundColor = chosenColor;
        currentColor = chosenColor;
        updateCurrentColorDisplay(customBlotch, chosenColor);

    })

    wrapper.appendChild(customBlotch);
    wrapper.appendChild(colorInput);
    colorBlotches.push(customBlotch);

    return wrapper;
}




function createButton() {
    const clearButton = document.createElement('button');
    clearButton.innerText = 'Clear';
    clearButton.style.marginRight = '100px';
    clearButton.addEventListener('click', () => {
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.style.backgroundColor = 'white';

        });

    });


    return clearButton;

}
const clearButton = createButton();
container.appendChild(clearButton);

//download button logic//
function convertToImage() {
    const squares = document.querySelectorAll('.grid-cell');

    const cols = isResized ? newCols : 100
    const rows = isResized ? newRows : 50
    const squareSize = 10;

    const canvasElement = document.createElement('canvas');
    const context = canvasElement.getContext('2d');

    canvasElement.width = cols * squareSize;
    canvasElement.height = rows * squareSize;


    squares.forEach((square, index) => {
        const x = (index % cols) * squareSize;
        const y = Math.floor(index / cols) * squareSize;
        const color = window.getComputedStyle(square).backgroundColor || 'white';
        context.fillStyle = color;
        context.fillRect(x, y, squareSize, squareSize);
    })
    return canvasElement;

}


function createDownloadButton() {
    const downloadButton = document.createElement('button')
    downloadButton.innerText = 'Download Image';
    downloadButton.style.margin = '10px';
    downloadButton.style.padding = '5px 5px';
    downloadButton.style.fontSize = '16px';
    downloadButton.style.fontWeight = 'bold';


    downloadButton.addEventListener('click', downloadCanvasImage);
    return downloadButton
}

function downloadCanvasImage() {
    const canvasElement = convertToImage();
    const link = document.createElement('a')
    link.href = canvasElement.toDataURL('img/png');
    link.download = 'your-canvas-doodle.png'

    link.click();
};

const downloadButton = createDownloadButton();
container.appendChild(downloadButton);

const brush = createBrushSizeSelection();
container.appendChild(brush);

function createBrushSizeSelection() {
    const brushSizeSelector = document.createElement('div');
    brushSizeSelector.style.display = "flex";

    const sizes = [
        { label: 'Small', value: 1, },
        { label: 'Medium', value: 2, },
        { label: 'Large', value: 3, }
    ];
    sizes.forEach(({ label, value }) => {
        const sizeButton = document.createElement('button');
        sizeButton.innerText = label;
        sizeButton.style.margin = '10px';
        sizeButton.style.padding = '5px';
        sizeButton.style.fontSize = '16px';
        sizeButton.addEventListener('click', () => {
            brushSize = value
        })
        brushSizeSelector.appendChild(sizeButton);

    })
    return brushSizeSelector;
}

function updateBrushSize(target) {
    if (brushSize === 1) {
        target.style.backgroundColor = currentColor
    } else if (brushSize === 2) {
        const targetX = target.offsetLeft;
        const targetY = target.offsetTop;
        const gridCells = document.querySelectorAll('.grid-cell')

        gridCells.forEach(cell => {
            const cellX = cell.offsetLeft;
            const cellY = cell.offsetTop;
            const distX = Math.abs(cellX - targetX)
            const distY = Math.abs(cellY - targetY)

            if (distX <= 10 && distY <= 10) {
                cell.style.backgroundColor = currentColor;
            }

        });

    } else if (brushSize === 3) {
        const targetX = target.offsetLeft;
        const targetY = target.offsetTop;
        const gridCells = document.querySelectorAll('.grid-cell')

        gridCells.forEach(cell => {
            const cellX = cell.offsetLeft;
            const cellY = cell.offsetTop;
            const distX = Math.abs(cellX - targetX)
            const distY = Math.abs(cellY - targetY)

            if (distX <= 30 && distY <= 30) {
                cell.style.backgroundColor = currentColor;
            }

        });
    } else if (brushSize === 4) {
        target.style.backgroundColor = currentColor
    };


}
function styleButton(button) {
    button.style.padding = '8px 16px';
    button.style.margin = '10px';
    button.style.border = 'none';
    button.style.borderRadius = '6px';
    button.style.backgroundColor = '#333';
    button.style.color = '#fff';
    button.style.fontSize = '14px';
    button.style.fontWeight = 'bold';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.2)';
    button.style.transition = 'all 0.2s ease-in-out';

    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#555';
    });

    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#333';
    });
}
document.querySelectorAll('button').forEach(styleButton);
