const express = require('express');
const router = express.Router()
const uniquid = require('uniquid')
const fs = require("fs")
const util = require('util');
const readFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
 fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
   err ? console.error(err) : console.info(`Entry written in ${destination}`)
 );

const readAppend = (content, file) => {
 fs.readFile(file, (err, data) => {
   if (err) {
     console.error(err);
   } else {
     const parsedData = JSON.parse(data);
     parsedData.push(content);
     writeToFile(file, parsedData);
   }
 });
};

const deleteEntry = (id, file) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let parsedData = JSON.parse(data);
      parsedData = parsedData.filter(note => note.id !== id)
      writeToFile(file, parsedData);
    }
  });
}

router.get("/api/notes", (req, res) => {
    console.info(`${req.method} received request`);

    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  })

router.post("/api/notes", (req,res)=> {
 
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uniquid()
  }

    readAppend(newNote, "./db/db.json");
    res.json(req.body);
})

router.delete("/api/notes/:id", (req,res) =>{

 deleteEntry(req.params.id, "./db/db.json")
  res.send(req.params.id)
})
 
  module.exports = router

