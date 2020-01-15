const mongoose = require('mongoose');
const userModel = require('../models/sessionModel')
const User = mongoose.model('Session');

exports.list_all_session = (req, res) => {
    Post.find({}, (error, sessions) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json(sessions);
      }
    })
  }

exports.create_a_session = function(req,res){
    let new_session = new Session(req.body);
    new_session.save((error, session) => {
        if(error){
          res.status(500);
          console.log(error);
          res.json({message: "Erreur serveur."});
        }
        else {
          res.status(201);
          res.json(session);
        }
      })
}

exports.get_a_session = (req, res) => {
    Post.findById(req.params.session_id, (error, session) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json(session);
      }
    })
  }
  
  exports.update_a_session = (req, res) => {
    Post.findOneAndUpdate({_id: req.params.session_id}, req.body, {new: true}, (error, session) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json(session);
      }
    })
  }
  

