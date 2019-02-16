// TODO: save this to github
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const environmentState = require('./data/mockDataEnvironment');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/environment', (req, res) => {
  // query environmnet state from Mongo

  res.json(environmentState);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
