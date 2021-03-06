var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

function initUser(db) {
  var userModel = require('../../../models/usermodel')(db);

  router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'usuarios'
    });
  });

  ///////////////////////////////////        all     /////////////////////////////////////////////////////////
  router.get('/all', (req, res) => {
    userModel.getAll((err, users) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          "error": "error"
        });
      }
      return res.status(200).json(users);
    });
  }); // get users/all

  ///////////////////////////////////        get user     /////////////////////////////////////////////////////////
  router.get('/:id', (req, res) => {
    var id = req.params.id;
    userModel.getById(id, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          "error": "error"
        });
      }
      return res.status(200).json(doc);
    }); // getBYId
  });
  ///////////////////////////////////       new user      /////////////////////////////////////////////////////////
  router.post('/new', (req, res) => {
    var datosEnviados = req.body;
    userModel.addNew(datosEnviados, (err, addedDoc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Error al crear Uusaurio'
        });
      }
      return res.status(200).json(addedDoc);
    }); //addNew
  }); // post users/new
  ///////////////////////////////////      update user       /////////////////////////////////////////////////////////
  router.put('/upd/:id', (req, res) => {
    var id = req.params.id;
    var data = {
      "_id": id,
      ...req.body
    };


    userModel.update(data, (err, updatedDoc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          "error": "error"
        });
      }
      return res.status(200).json(updatedDoc);
    }); // update
  });

  ///////////////////////////////////      delete user       /////////////////////////////////////////////////////////
  router.delete('/del/:id', (req, res) => {
    var id = req.params.id;
    userModel.deleteByCode(id, (err, deletedDoc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          "error": "error"
        });
      }
      return res.status(200).json(deletedDoc);
    }); //  deleteByCode
  }); //delete

  ///////////////////////////////////     login       /////////////////////////////////////////////////////////
  router.post('/login', (req, res) => {
    var {
      userEmail,
      userPswd
    } = req.body;

    userModel.getByEmail(req.body.useremail, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          "msg": "Credencales no pueden ser validadas"
        });
      }
      if (user) {
        if (userModel.comparePswd(user.userPswd, req.body.userpswd)) {
          delete user.userPswd;
          var token = jwt.sign(user,
            'secretobiensecreto', {
              expiresIn: '60m'
            }
          )
          console.log(token);
          return res.status(200).json({
            "user": user,
            "jwt": token
          });
        }
      }
      return res.status(400).json({
        "msg": "Credencales no pueden ser validadas"
      });
    }); //getByEmail
  }); // post login

  return router;
}
module.exports = initUser;