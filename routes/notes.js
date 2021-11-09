// Dependencies
const notes = require("express").Router();
const path = require("path");
const uuid = require("../helpers/uuid");
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
  
// const { rawListeners } = require(".");
// const { readFileSync } = require("fs");

// looks for the notes 
notes.get('/', (req, res)=>{
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);
    const { text, title } = req.body;
    if (req.body) {
      const newTip = {
        text,
        title,
        id: uuid(),   
      };
      readAndAppend(newNote, "./db/db.json");
      res.json(`note added successfully `);
    } else {
      res.error('Error in adding note');
    }
  });

  notes.get("/:id", (req, res) => {
    const noteId = req.params.id;
    readFromFile("./db/db.json")
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json("No note with that ID");
      });
  });

//READ database, find note you want to delete and then delete it 
notes.delete('/:id', (req, res) =>{
    readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
        writeToFile('./db/db.json', result); 
        res.json(`This note has been deleted ${noteId}`);
      });
  });


module.exports = notes;