const express = require('express');
const { PORT } = require('./config');
const blockchainRouter = require('./routes/blockchain');

const app = express();
app.use(express.json());
app.use('/blockchain', blockchainRouter);

app.get('/', (req, res) => res.json('Bienvenido'));

app.listen(PORT, () => {
  console.log('HTTP Server Listening On Port : ' + PORT);
});
