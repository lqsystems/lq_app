const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.json({ message: 'Hola Mundo!' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
