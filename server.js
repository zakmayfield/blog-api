const express = require('express');
const cors = require('cors');
const app = express();
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);
app.use('/api', require('./routes'));

app.get('/', (req, res) => {
  res.send(`✅ Server OK`);
});

app.get('*', (req, res) => {
  res.send(`🚫 Route does not exist`);
});

app.listen(port, () => console.log(`✅ Server OK`));
