const db = require("../models");

// Defining methods for the booksController
const controller = {
  findAll: (req, res) => {
    db.Card.findAll({
        where: {
          active: true
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByCardId: function(req, res) {
    db.Card.findOne({
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
  findCardsForUser: (req, res) => {
    db.Card.findAll({
      where: {
        UserId: userID,
        shownCount: iterator,
        lastShown: { $gte: since },
        active: true
      }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUser: (req, res) => {
    db.Card.findAll({
      where: {
        userID: userID,
        active: true
      }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Card.create({
        seed: req.body.seed,
        soil: req.body.soil
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Card.update({
        seed: req.body.seed,
        soil: req.body.soil
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
    db.Card.update({
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
