let arr = [];

function loadDataForNewUser() {
  socket.on("load array", (arr) => {
    if (arr.length !== 0) {
      console.log(arr);
    }
  });
}

/* --------- Build the Buttons Programmatically --------- */
function buildButtons() {
  //Set the div element = buttonsDiv to add our constructed buttons to
  const buttonsDiv = document.getElementById("buttonsDiv");
  const values = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "C",
    "+",
    "=",
  ];
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
      if (typeof values[index] !== "undefined") {
        if (values[index] === "=") {
          //If the button value is '=' add id='equals' to change the width separately
          rowHtml +=
            "<button id='equals' class='column'>" + values[index] + "</button>";
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
}
buildButtons();

/* --------- Attach Click Functionality to Buttons --------- */
function clickedButtons() {
  const display = document.getElementById("displayDiv");
  const buttonsDiv = document.getElementById("buttonsDiv");
  const buttons = buttonsDiv.getElementsByTagName("button");

  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    let value = button.innerText;

    if (isNaN(value) === false) {
      button.addEventListener("click", (e) => {
        display.innerText += e.target.innerText;
      });
    } else {
      switch (value) {
        // For all instances but clear and equals; \xa0 is a no-break space
        case "/":
        case "*":
        case "-":
        case "+":
          button.addEventListener("click", (e) => {
            display.innerText += "\xa0" + e.target.innerText + "\xa0";
          });
          break;

        // Since I dont want a space between the numbers and .
        case ".":
          button.addEventListener("click", (e) => {
            display.innerText += e.target.innerText;
          });
          break;

        // If the clear button is clicked reset the display to be blank
        case "C":
          button.addEventListener("click", (e) => {
            display.innerText = "";
          });
          break;

        case "=":
          button.addEventListener("click", (e) => {
            emitToServer(display.innerText + " = " + eval(display.innerText));
            // Clears the calculator after you hit equals
            display.innerText = "";
          });
          break;
      }
    }
  }
}
clickedButtons();

function emitToServer(str) {
  arr.push(str);

  // Communicate the calculation with the server
  socket.emit("calc", str);

  // Only send one calculation at a time
  arr.shift();
}

function appendElement(str) {
  var list = document.getElementById("calcList");

  // Remove the last element if we hit our maximum history length of 9
  var listElements = list.getElementsByTagName("li");
  if (listElements.length > 9) {
    listElements[9].remove();
  }

  const li = document.createElement("li");
  li.append(document.createTextNode(str));
  list = list.insertBefore(li, list.childNodes[0]);
}

// Create and append the new element to the page
socket.on("message", (str) => {
  appendElement(str);
});

// Load existing calculation for new users to see
socket.on("load existing", (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    appendElement(arr[i]);
  }
});
