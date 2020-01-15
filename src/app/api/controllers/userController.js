const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel')
const User = mongoose.model('User');

exports.register = (req, res) => {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
      if (err) {
        res.status(500);
        res.json({message: "Erreur lors de la création de l'user"});
      } else {
        user.hash_password = undefined;
        return res.json(user);
      }
    });
}

exports.sign_in = (req, res) => {
    User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) {
            res.status(500);
            res.json({message: "Erreur serveur lors de la connexion"})
        }
        if (!user) {
          res.status(401).json({ message: 'Aucun utilisateur trouvé avec cette adresse mail' });
        } else if (user) {
          if (!user.comparePassword(req.body.password)) {
            res.status(401).json({ message: 'Auth failed' });
          } else {
            return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'nodejs_api')});
          }
        }
      });
}

exports.delete_user = (req, res) => {
    User.findOneAndRemove({email: req.body.email}, (err, res) => {
        if (err) {
            res.status(500).json({message: "Erreur lors de la supression"});
        } else {
            res.status(200).json({success: true})
        }
    })
}

exports.modify_user = (req, res) => {
    req.body.hash_password = bcrypt.hashSync(req.body.password, 10);
    User.findByIdAndUpdate(req.body.id, req.body, (err, res) => {
        if (err) {
            res.status(500).json({message: "Erreur lors de la modification"});
        } else {
            
        }
    })
}

exports.get_all = (req, res) => {
    User.find((err, res) => {
        if (err) {
            res.status(500).json({message: "Erreur lors de la récupération des Users"});
        } else {
            res.status(200).json(res);
        }
    })
}

exports.adminRequired = function(req, res, next) {
    if (req.user && user.role == 0) {
        next();
      } else {
        return res.status(401).json({ message: 'Utilisateur non autorisé' });
      }
}

exports.studentRequired = function(req, res, next) {
    if (req.user && user.role == 2) {
        next();
      } else {
        return res.status(401).json({ message: 'Utilisateur non autorisé' });
      }
}