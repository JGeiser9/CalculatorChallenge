const buttons = document.getElementsByTagName('td');

for (var i = 0;i < buttons.length; i++ ) {
  buttons[i].addEventListener('click', toScreen);
}

//Adds the value of the specific button to the display
function toScreen(e) {
  //e.target refers to the button that was clicked
  let num = Number(e.target.value);
  console.log(num);
}
