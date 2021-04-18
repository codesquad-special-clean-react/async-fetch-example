const PORT_NUMBER = 3003;
const express = require('express');
const app = express();

app.listen(PORT_NUMBER, function () {
  console.log(`start, express server on port ${PORT_NUMBER}`);
});

app.use(express.static('public'));
