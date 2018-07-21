const jayson = require('jayson/promise');
const NoteController = new (require('./Controller/NoteController'))();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notes_app');

const server = jayson.server({
  add: req => {
    return NoteController.addNote(req);
  },
  update: req=>{
    return NoteController.updateNote(req);
  },
  delete: req=>{
    return NoteController.deleteNote(req);
  },
  all: req => {
    return NoteController.getAllNotes(req);
  },
  getNote: req => {
    return NoteController.getNote(req);
  }
});

server.http().listen(3001, ()=> {
  console.log('Listening on 3001')
});