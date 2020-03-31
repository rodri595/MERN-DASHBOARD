var express =  require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

function initUser (db) {
var userModel = require('../../../models/usermodel')(db);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'usuarios' });
});


router.get('/users/all', (req, res)=>{
    userModel.getAll((err, users)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(users);
    });
} ); // get users/all


router.get('/users/:id',(req, res)=>{
    var id =  req.params.id ;
    userModel.getById(id, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });// getBYId
});

router.post('/users/new', (req, res)=>{
  var datosEnviados = req.body;

  console.log('data por aqui 1');

  userModel.addNew(datosEnviados, (err, addedDoc)=>{
    console.log('data por aqui 2');
    if(err){
      console.log(err);
      return res.status(500).json({error:'Error al crear Uusaurio'});
    }
    return res.status(200).json(addedDoc);
    }); //addNew
}); // post users/new

router.put('/users/upd/:id', (req, res)=>{
  var id = req.params.id;
  var data = {
    "_id": id,
    ...req.body
  };


  userModel.update(data, (err, updatedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(updatedDoc);
  });// update
});


router.delete('/users/del/:id', (req, res)=>{
  var id = req.params.id;
  userModel.deleteByCode(id, (err, deletedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(deletedDoc);
  }); //  deleteByCode
});//delete


router.post('/login', (req, res)=>{
  var {userEmail, userPswd} = req.body;
  userModel.getByEmail(userEmail, (err,user)=>{
    if(err){
      console.log(err);
      return res.status(400).json({"msg":"Credencales no pueden ser validadas"});
    }
    if (userModel.comparePswd(user.userPswd, userPswd)){
      delete user.userPswd;
      var token =  jwt.sign(user,
      'secret',
      {expiresIn:'60m'}
      )
      return res.status(200).json({"user":user, "jwt":token});
    }
    console.log({ userEmail, userPswd, ...{ "msg":"No Coincide Pswds"}});
    return res.status(400).json({ "msg": "Credencales no pueden ser validadas" });
  });//getByEmail
});// post login

 return router;
}
module.exports = initUser;
