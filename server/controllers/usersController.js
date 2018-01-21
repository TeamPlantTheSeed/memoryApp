const db = require("../models");

// Defining methods for the booksController
const controller = {
  findAll: (req, res) => {
    db.User.findAll({
        where: {
          active: true
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User.findOne({
        where: {
          id: req.params.id,
          active: true
        }
      })
      .then(dbModel => {
        if (dbModel) {
          res.json(dbModel);
        } else {
          res.status(404).json({
            message: 'Id not found.'
          });
        }
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.create({
      userName: req.body.userName,
      userPassword: req.body.userPassword
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User.update({
      userName: req.body.userName,
      userPassword: req.body.userPassword
      }, {
        where: {
          id: req.params.id,
          active: true
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User.update({
        active: false
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

export { controller as default };
