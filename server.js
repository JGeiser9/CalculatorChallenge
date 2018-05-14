const express = require('express');
const path = require('path');
const app = express();
const server = app.listen(3000, () => {
  console.log("Good afternoon Mr. Wick, here for pleasure or business?");
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.sendFile('index.html');
});
