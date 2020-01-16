const mongoose = require('mongoose');
const noteModel = require('../models/noteModel')
const Note = mongoose.model('Note');

exports.list_all_note = (req, res) => {
  Note.find({}, (error, notes) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json(notes);
      }
    })
  }

exports.create_a_note = function(req,res){
    let new_note = new Note(req.body);
    new_note.save((error, note) => {
        if(error){
          res.status(500);
          console.log(error);
          res.json({message: "Erreur serveur."});
        }
        else {
          res.status(201);
          res.json(note);
        }
      })
}

exports.get_a_note = (req, res) => {
  Note.findById(req.params.id, (error, note) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json(note);
      }
    })
  }
