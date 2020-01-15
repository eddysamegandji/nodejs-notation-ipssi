const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel')
const User = mongoose.model('User');

exports.register = function(req, res) {
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

exports.sign_in = function(req, res) {
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

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
      } else {
        return res.status(401).json({ message: 'Utilisateur non autorisé' });
      }
}