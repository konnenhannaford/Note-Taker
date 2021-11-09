// Dependencies
const notes = require("express").Router();
const path = require("path");
const uuid = require("../helpers/uuid");

const {
    readFromFile, 
    writeToFile, 
} = require("../helpers/fsUTIL");
const { rawListeners } = require(".");
const { readFileSync } = require("fs");

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

//READ database, find note you want to delete and then delete it 
notes.delete('/:id', function(req, res){
    readFromFile("./db/db.json", { encoding: "utf-8" }, (err, data) => {
        if (err){
            console.log("Error deleting file");
            res.status(500);
        } else {
            let dataBase = JSON.parse(data);
            let noteId = req.params.id;
            let deleteIndex =  dataBase.findIndex((note) => {
                return note.id === noteId;
            });
            dataBase.splice(deleteIndex, 1);
            writeToFile("./db/db.json", dataBase);
            res.json(dataBase);
        }
    });
});



module.exports = notes;