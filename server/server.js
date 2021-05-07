const express = require('express');

const app = express();

app.use(express.static('../client/assets'));
app.use(express.json());









app.get('*', (req, res) => {
  res.status(404).send('Nothing here');
})

app.use((err, req, res, next) => {
  const defaultError = {
    status: 500,
    log: 'Problem in some middleware',
    message: 'Serverside problem',
  }
  const ourError = Object.assign(defaultError, err);

  console.log(ourError.log);

  res.status(ourError.status).send(ourError.message);
})


app.listen('http://localhost:3000')