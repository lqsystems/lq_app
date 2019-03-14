const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/vue/', express.static('dist'));

app.listen(PORT, () => console.log(`Vue client is running on port ${PORT}!`));
