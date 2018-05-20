/* --------- Global Variables --------- */
const message = '';

/* --------- Create a fucntion to build the buttons --------- */
function buildButtons() {
  //Set the div element = buttonsDiv to add our constructed buttons to
  const buttonsDiv = document.getElementById('buttonsDiv');
  const values = [ '7', '8', '9', '/',
                   '4', '5', '6', '*',
                   '1', '2', '3', '-',
                   '0', '.', 'C', '+',
                   '='];
  const columns = 4;
  let rows = Math.ceil(values.length / columns); //Used this to avoid hard coding incase it changes

  //Building out each row of the calculator - 4 total
  for (let i = 0; i < rows; i++) {
    //Create the beginning of our element to concatenate on to
    let rowHtml = "<div class='row'>";

    //Loop through the values and build a button element with the value in the array
    for (let j = 0; j < 4; j++) {
      //Math to calculate the index of each rows contents
      let index = i * columns + j;
      //Since I only one one button, only make a button if there is a value for it in the value array
      if (typeof values[index] !== 'undefined') {
        if(values[index] === '=') {
          //If the button value is '=' add id='equals' to change the width separately
          rowHtml += "<button id='equals' class='column'>" + values[index] + "</button>";
        } else {
          //If button value is anything else
          rowHtml += "<button class='column'>" + values[index] + "</button>";
        }
      }

    }
    //Add the closing tag
    rowHtml += "</div>";
    //Add the concatenated element to our html
    buttonsDiv.innerHTML += rowHtml;
  }
} buildButtons();


/* --------- Create a fucntion to do something when clicked --------- */
function clickedButtons() {
  const display = document.getElementById('displayDiv');
  const buttonsDiv = document.getElementById('buttonsDiv');
  const buttons = buttonsDiv.getElementsByTagName('button');

  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    let value = button.innerText;

    if (isNaN(value) === false) {
      button.addEventListener('click', (e) => {
        display.innerText += e.target.innerText;
      });
    } else {
        switch (value) {

          //For all instances but clear and equals; \xa0 is a no-break space
          case '/':
          case '*':
          case '-':
          case '+':
            button.addEventListener('click', (e) => {
              display.innerText += '\xa0' + e.target.innerText + '\xa0';
            });
            break;

          //Since I dont want a space between the numbers and .
          case '.':
            button.addEventListener('click', (e) => {
              display.innerText += e.target.innerText;
            });
            break;

          //If the clear button is clicked reset the display to be blank
          case 'C':
            button.addEventListener('click', (e) => {
              display.innerText = '';
            });
            break;

          case '=':
            button.addEventListener('click', (e) => {
              calculate(display.innerText);
            });
            break;
        }
    }
  }
} clickedButtons();


/* --------- Create a function to evaluate the math and kick to sockets --------- */
function calculate(str) {
  const string = str
  const answer = eval(string);
  buildMessage(answer, str); //Passing our message builder the calculated answer
  //Idea --> insert an if statement to truncate the answer to 4 decimals
}

/* --------- Create a function to display socket message --------- */
function buildMessage(answer, str) {
  console.log('The answer is ' + str + ' = ' + answer);

  const socketDiv = document.getElementById('socketDiv');
  const display = document.getElementById('displayDiv');

  //This is where we would send our socket messages
  /* To Do:
      - Need to figure out how to get the calculations to stay on page! */
  socketDiv.innerHTML = str + ' = ' + answer;
  display.innerText = '';
}

// function insertAfter(newNode, referenceNode) {
//     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// }
