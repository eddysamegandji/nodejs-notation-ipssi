const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moduleModel = require('../models/moduleModel')
const Module = mongoose.model('Module');

exports.add_module = function (req, res) {
    var newModule = new Module (req.body);
    newModule.save((error, module) =>{
        if(error){
            res.status(500);
            res.json({message: "Erreur lors de l'ajout du module"});
        }else{
            return res.json(module);
        }
    })
}

exports.list_all_modules = (req, res) => {
    Module.find({intervenant_id: req.params.intervenant_id}, (error, modules) => {
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
    Module.findOne(req.params.module_name, (error, module) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json(module);
      }
    })
  }
  exports.update_a_module = (req, res) => {
    Module.findOneAndUpdate({_id: req.params.module_name}, req.body, {new: true}, (error, module) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json(module);
      }
    })
  }
  
  exports.delete_a_module = (req, res) => {
    Module.remove({_id: req.params.module_name}, (error) => {
      if(error){
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."});
      }
      else {
        res.status(200);
        res.json({message: "Module supprimé"});
      }
    })
  }
