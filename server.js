const express = require('express');
const path = require('path');
// const fsPromises = require('fs').promises;
const fs = require('fs');
//Method for generating unique ids
const uuid = require('./public/assets/js/uuid');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware to serve static files from /public
app.use(express.static('public'));

//Get * should return the index.html file
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/index.html'))
});

//Get /notes should return the notes.html file
app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get("/api/notes", (req, res) => {
   fs.readFile("./db/db.json", "utf-8", (err, response) => {
      if (err) {
         console.log(err)
      } else {
         var data = JSON.parse(response)
         res.json(data)
      }
   })

})

app.post("/api/notes", (req, res) => {
      console.info(`${req.method} request received to add new note`)

      //When user inputs text in the title and body
      const { title, text } = req.body;

      if (title && text) {
         const newNote = {
            title,
            text,
            //Unique ID for each note
            text_id: uuid()
         };

         const response = {
            status: 'success',
            body: newNote,
         };

         //This will read the data in the json file and it will add the new data to the array
         fs.readFile("./db/db.json", "utf-8", (err, response) => {
            if (err) {
               console.log(err)
            } else {
               var data = JSON.parse(response)
               data.push(newNote)
               fs.writeFile("./db/db.json", JSON.stringify(data, null, 2), err => {
                  err ? console.log(err) : console.log("Yay!")
               })
            }
         })

         //If POST request was successful 
         res.status(201).json(response);
      } else {
         //If POST request didn't work
         res.status(500).json('Error in creating new note');
      }
   });

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () =>
   console.log(`Example app listening at http://localhost:${PORT}`)
);