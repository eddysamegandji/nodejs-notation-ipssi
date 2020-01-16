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
            return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id, role: user.role}, 'nodejs_api'), role: user.role});
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
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            res.status(500).json({message: "Erreur lors de la modification"});
        } else {
            res.status(200).json({success: true});
        }
    })
}

exports.get_all = (req, res) => {
    User.find((err, user) => {
        if (err) {
            res.status(500).json({message: "Erreur lors de la récupération des Users"});
        } else {
            for (let index = 0; index < user.length; index++) {
                user[index].hash_password = undefined;
            }
            res.status(200).json(user);
        }
    })
}

exports.get_all_intervenant = (req, res) => {
  User.find({role: 1}, (err, user) => {
      if (err) {
          res.status(500).json({message: "Erreur lors de la récupération des Users"});
      } else {
          for (let index = 0; index < user.length; index++) {
              user[index].hash_password = undefined;
          }
          res.status(200).json(user);
      }
  })
}

exports.adminRequired = (req, res, next) => {
    if (req.user && req.user.role == 0) {
        next();
      } else {
        return res.status(401).json({ message: 'Utilisateur non autorisé' });
      }
}

exports.studentRequired = (req, res, next) => {
    if (req.user && req.user.role == 2) {
        next();
      } else {
        return res.status(401).json({ message: 'Utilisateur non autorisé' });
      }
}

exports.userRequired = (req, res, next) => {
  console.log(req.user)
  if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: 'Utilisateur non autorisé' });
    }
}