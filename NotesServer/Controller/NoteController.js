const Note = require('../models/Note');
class NotesController {
    constructor(){

    }
    //GET ALL NOTES
    getAllNotes(req){
        return Note.find({ userId: req.userId })
    }

    //GET NOTE BY ID
    getNote(req){
        return Note.findOne({
            userId: req.body.userId,
            _id: req.params.id
        })
    }

    // ADD NOTES
    addNote(req){
        return Note.create({
            userId: req.userId,
            userProfileId: req.userProfileId,
            content: req.content,
        })
        .then(data => { return data })
    }

    //UPDATE NOTES
    updateNote(req){
        return Note.findOneAndUpdate({
            userId: req.body.userId,
            _id: req.params.id
        }, { $set: { content: req.body.content }},{returnOriginal: false, upsert: true})
        .then(data =>{ return data })
    }

    //DELETE NOTES
    deleteNote(req){
        return Note.deleteOne({
            userId: req.body.userId,
            _id: req.params.id
        })
    }
}



module.exports = NotesController;
