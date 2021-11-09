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

notes.post('/', (req, res)=>{
    readFromFile("./db/db.json", { encoding: "utf-8" }, (err, data) => {
        if (err) {
            // console.log("Error writing file");
            res.status(500);
        } else {
            let dataBase = JSON.parse(data);
            let newNote = req.body
            newNote.id = uuid();
            dataBase.push(newNote);
            // console.log(req.body);
            writeToFile('./db/db.json', dataBase);
            res.json(dataBase);
        }
    });
});

tips.post('/', (req, res) => {
    console.log(req.body);
  
    const { username, topic, tip } = req.body;
  
    if (req.body) {
      const newTip = {
        username,
        tip,
        topic,
        tip_id: uuidv4(),
      };
  
      readAndAppend(newTip, './db/tips.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
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