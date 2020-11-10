require('dotenv').config();

const app = require('./lib/app');
const express = require('express');
const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
