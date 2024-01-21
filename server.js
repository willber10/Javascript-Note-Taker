const express = require('express');

const fs = require('fs');

const path = require('path');

const port = process.env.PORT || 3001;

const uuid = require('uuid');

// initialize express
const app = express();

// serve static files
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// start the server and listen on port
app.listen(port, () => {
  console.log(`Server listening on port ${port}, Visit http://localhost:${port} in your browser.`);
});

// define routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.post('/api/notes', (req, res) => {
  console.log(req.body);
  let notes = fs.readFileSync('./db/db.json', 'utf8');
  notes = JSON.parse(notes);
  req.body.id = uuid.v4();
  console.log(req.body);
  notes.push(req.body);
  notes = JSON.stringify(notes);
  fs.writeFileSync('./db/db.json', notes, 'utf8');
  res.json(JSON.parse(notes));
}); 

app.get('/api/notes', (req, res) => {
 let notes = fs.readFileSync('./db/db.json', 'utf8');
 notes = JSON.parse(notes);
  res.json(notes);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

