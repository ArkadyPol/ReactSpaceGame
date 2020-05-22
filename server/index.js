const express = require('express');
const path = require('path');
const { getSaves, loadSave, createSave } = require('./fs-helper');

const app = express();
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.json());
app.post('/save', (req, res) => {
  res.json(loadSave(req.body));
});
app.get('/saves', (req, res) => {
  res.json(getSaves());
});
app.post('/saves', (req, res) => {
  createSave(req.body);
  res.end();
});
app.get('/*', (req, res) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
