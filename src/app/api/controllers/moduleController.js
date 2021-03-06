const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moduleModel = require('../models/moduleModel')
const Module = mongoose.model('Module');

exports.add_module = function (req, res) {
    var newModule = new Module (req.body);
    newModule.save((error, modulee) =>{
        if(error){
            res.status(500);
            res.json({message: "Erreur lors de l'ajout du module"});
        }else{
            return res.json(modulee);
        }
    })
}

exports.list_all_modules = (req, res) => {
    Module.find({}, (error, modules) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json(modules);
      }
    })
  }

exports.get_a_module = (req, res) => {
    Module.findById(req.params.module_id, (error, modulee) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json(modulee);
      }
    })
  }
  exports.update_a_module = (req, res) => {
    Module.findByIdAndUpdate(req.params.module_id, req.body, {new: true}, (error, modulee) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json(modulee);
      }
    })
  }
  
  exports.delete_a_module = (req, res) => {
    Module.findByIdAndRemove(req.params.module_id, (error) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json({success: true});
      }
    })
  }
