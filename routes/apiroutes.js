// Dependencies
const router = require("express").Router();
const path = require("path");
const uuid = require("../helpers/uuid");
const {
    readFromFile, 
    writeToFile, 
} = require("../helpers/fsUtils");
const { rawListeners } = require(".");
const { readFileSync } = require("fs");

// GET notes from db.json
router.get('/', function(req, res){
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', function(req, res){
    // save notes to db.json
    // read file, 
    // then add new data to array
    // then save array as file (overwrite when using writeFile)
    readFromFile("./db/db.json", { encoding: "utf-8" }, (err, data) => {
        if (err) {
            console.log("Error writing file");
            res.status(500);
        } else {
            let dataBase = JSON.parse(data);
            let newNote = req.body
            newNote.id = uuid();
            dataBase.push(newNote);
            console.log(req.body);
            writeToFile('./db/db.json', dataBase);
            res.json(dataBase);
        }
    });
});

//READ database, find note you want to delete and then delete it 
router.delete('/:id', function(req, res){
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



module.exports = router;