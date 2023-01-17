const express = require('express');
const path = require('path');
const termData = require('./db/db.json');
const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Middleware to serve static files from /public
app.use(express.static('./public'));

//Get * should return the index.html file
 app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
 });

 //Get /notes should return the notes.html file
 app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
 });

 //API route that will return the content to the json file
 app.get('/api/notes', (req,res) => {
   res.json(termData)});

 app.post('/api/notes',(req, res) => {
   //should receive a new note to save on the request body,add it to the db.json file, 
   //and then return the new note to the client.
 })


 //Need to give each note a unique id when its saved (look into npm packages that could do this)

 //The application should include a db.json file that will be used to store and retrieve notes using the fs module

 app.listen(PORT, () =>
 console.log(`Example app listening at http://localhost:${PORT}`)
);


