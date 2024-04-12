const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use('/static', express.static('public'))

const port = 3000;

const routes = require('./routes/sneakers');

app.use(routes);

app.listen(port, () => {console.log(`Server listening on port ${port}`)});