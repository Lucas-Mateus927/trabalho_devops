const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API de Pedidos Online rodando!' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

module.exports = app;