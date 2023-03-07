// container for the grid
const gridContainer = document.getElementById("grid-container");

// TODO:
let slider = document.getElementById("slider");
// add event listener for the slider to detect when it's changed
slider.onchange = (e) => resizeGrid(e.target.value);

// generates the grid
function makeGrid(rows, cols) {
  // keep track of when mouse is clicked
  let isMouseDown = false;

  // set the following css properties equal to the corresponding rows/cols
  gridContainer.style.setProperty('--grid-rows', rows);
  gridContainer.style.setProperty('--grid-cols', cols);
  
  // make the grid
  for (c = 0; c < (rows * cols); c++) {
    // make a new div container for each square
    let square = document.createElement("div");

    // add the square to the grid with class name
    gridContainer.appendChild(square).className = "grid-item";
    
    // add an event listener to each square created
    // event will listen for mousedown: when mouse is clicked
    square.addEventListener('mousedown', () => {
      isMouseDown = true
    });

    // add another event listener to the square
    // event will listen for mouseup; when mouse in un-clicked
    square.addEventListener('mouseup', () => {
      isMouseDown = false;
    });

    // add another event listener to the square
    // event will listen for mouseenter; when mouse is in the square container
    // if that is the case AND the mouse is clicked; then change the background to black
    square.addEventListener('mouseenter', () => {
      if (isMouseDown) {
        square.style.backgroundColor = 'black';
      }
    });
  };
}

// erase the grid
function eraseGrid() {
  // select the existing grid
  const gridContainer = document.querySelector('[id=grid-container]');

  // remove existing grid
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  makeGrid(rows, cols);
}

// TODO: resize grid
function resizeGrid(n) {
  // step 1: erase the grid
  eraseGrid();

  // TODO: step 2: rebuild the grid with new dimensions
  slider.innerHTML = n + " x " + n;

  // n x n grid, so get slider value and set to cols and row
  makeGrid(n, n);
}

// grid size parameters
let rows = 16;
let cols = 16;

makeGrid(rows, cols);