let isMouseDown = false;

/* --------------------------------------------------------------------------- */ 
// Makes the grid 

// first, select the grid
const grid = document.querySelector('.grid');

function makeGrid(val) {
  // we start with a 16 x 16 grid when you start up the page
  for (let i = 0; i < val * val; i++) {
    // first, create a div for the cell
    const div = document.createElement('div');
    // add the cell class (for formatting)
    div.classList.add('cell');

    // listens for mouse clicked down
    div.addEventListener('mousedown', () => {
      isMouseDown = true;
    });

    // listens for mouse released from click
    div.addEventListener('mouseup', () => {
      isMouseDown = false;
    });

    // listens for mouse entering the cell
    div.addEventListener('mouseenter', function(event) {
      // cell will only get filled in while the user is clicking down on the mouse. black by default
      if (isMouseDown) {
        event.target.style.backgroundColor = 'black';
      }
    });

    // now that the cell is set up, add it to the grid
    grid.appendChild(div); 
  }
};

/* --------------------------------------------------------------------------- */ 
/* Adding slider functionality */

// get the slider by its id
const slider = document.querySelector('#slider')
// get the slider value by its class
const screenVal = document.querySelector('.value');

// add a listener when slider has an input
slider.addEventListener('input', function(){
  // save the sliders ACTUAL val. what you see on the screen is different unless you update it
  let val = document.getElementById('slider').value;

  // updating the screen's value to the slider's ACTUAL val
  screenVal.textContent = val;
  
  // remove the entire grid
  removeAllCells(grid);

  // set the grid row and column value to the slider's value
  grid.setAttribute('style', `grid-template-columns: repeat(${val}, 2fr); grid-template-rows: repeat(${val}, 2fr);`);

  // regenerate a new grid with new value
  makeGrid(val);
});

/* --------------------------------------------------------------------------- */ 
/* Removes all cells of the grid */

function removeAllCells(parent){
  while(parent.firstChild){
      parent.removeChild(parent.firstChild);
  }
}

/* --------------------------------------------------------------------------- */ 
/* Adds functionality to reset button */

// select the reset button by its id
const reset = document.querySelector('#reset');

// when reset button is clicked, unfill the cells
reset.addEventListener('click', function(){
  // get the value of the slider 
  let val = document.getElementById('slider').value;

  // get all of the grid's cells
  let cell = grid.children;

  // for each cell, change the color back to white
  for (let i = 0; i < val*val; i++) {
      cell[i].style.backgroundColor = 'white';
  }
});

/* --------------------------------------------------------------------------- */ 
/* Changes grid color to black */

// select the black button by its id
const black = document.querySelector('#black');

// when the black button is clicked...
black.addEventListener('click', function(){
  // get the rgb button by its id
  const rgb = document.getElementById('rgb');
  // unhighlight the rgb button
  rgb.style.border = '2px solid white';

  // highlight the black button
  black.style.border = '2px solid yellow';

  // get the slider value
  let val = document.getElementById('slider').value;

  // change the color 
  color = 'black';

  // get the cells
  let cell = grid.children;

  // for each cell, set the listener so that it fills the cells in with black
  for (let i = 0; i < val * val; i++) {
    cell[i].addEventListener('mouseenter', function(event) {
      if (isMouseDown) {
        event.target.style.backgroundColor = 'black';
      }
    });
  }

});

/* --------------------------------------------------------------------------- */ 
/* Changes grid color to rainbow */

// select the rgb id
const rgb = document.querySelector('#rgb');

// add a listener when rainbow button is clicked to change from black to rainbow
rgb.addEventListener('click', function(){
  // get the black id
  const black = document.getElementById('black');

  // unhighlight the black 
  black.style.border = '2px solid white';

  // highlight the yellow
  rgb.style.border = '2px solid yellow';

  // get the slider value
  let val = document.getElementById('slider').value;

  // get the cells
  let cell = grid.children;

  // for each cell, change it to a random color
  for (let i = 0; i < val*val; i++) {
    cell[i].addEventListener('mouseenter', function(event){
      if (isMouseDown) {
        event.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      }
    });
  }
});

makeGrid(16);