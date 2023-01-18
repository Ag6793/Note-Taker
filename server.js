const express = require('express');
const path = require('path');
//Method for generating unique ids
const uuid = require('./public/assets/js/uuid');
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
   res.json(termData)
});



 app.post('/api/notes',(req, res) => {

   console.info(`${req.method} request received to add a new note`);
   //When user inputs text in the title and body
   const { title, text} = req.body;

   if ( title && text) {
      const newNote = {
         title,
         text, 
         //Unique ID for each note
         text_id: uuid()
      };

      const noteString = JSON.stringify(newNote);



      const response = {
         status: 'success',
         body: newNote,
      };

      console.log(response);

      
      //If POST request was successful 
      res.status(201).json(response);
   } else {
      //If POST request didn't work
      res.status(500).json('Error in creating new note');
   }

   //should receive a new note to save on the request body,add it to the db.json file, 
   //and then return the new note to the client.

 });

 //*Bonus :id will target a specific note
//  app.delete('/app/notes/:id', (req, res) => { });


 //Need to give each note a unique id when its saved (look into npm packages that could do this)

 //The application should include a db.json file that will be used to store and retrieve notes using the fs module

 app.listen(PORT, () =>
 console.log(`Example app listening at http://localhost:${PORT}`)
);


