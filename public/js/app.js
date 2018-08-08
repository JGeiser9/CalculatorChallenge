let arr = [];

function loadDataForNewUser() {
  socket.on('load array', (arr) => {
    if(arr.length !== 0) {
      console.log(arr);
    }
  });
}

/* --------- Create a function to build the buttons --------- */
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
  // console.log('clicked buttons called');
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
              emitToServer(display.innerText + ' = ' + eval(display.innerText));
              display.innerText = ''; // Clears the calculator after you hit equals
            });
            break;
        }
    }
  }
} clickedButtons();


/* --------- Create a function to send to sockets and push to array --------- */
function emitToServer(str) {
  //console.log('arr len: ' + arr.length)
  arr.push(str);
  socket.emit('calc', str); //sends calculation to server
  arr.shift(); //only send one calculation to the server each time
}

function appendElement(str) {
  var list = document.getElementById("calcList");

  // remove the last element if we hit our maximum history length
  var listElements = list.getElementsByTagName('li');
  if (listElements.length > 9) {
      listElements[9].remove();
  }

  const li = document.createElement('li');
  li.append(document.createTextNode(str));
  list = list.insertBefore(li, list.childNodes[0]);

}

/* ---------------------------------- */
//When the equals button is clicked, create and append the new element to the page
socket.on('message', (str) => {
  appendElement(str);
});

//if the array has anything in it, load it for the new user to see
socket.on('load existing', (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    appendElement(arr[i]);
  }
});
