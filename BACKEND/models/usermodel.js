var ObjectID = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var hasIndexEmail = false;

function pswdGenerator( pswdRaw ){
  var hashedPswd = bcrypt.hashSync(pswdRaw, 10);
  return hashedPswd;
}


module.exports = (db)=>{
  var UserModel = {}
  var UserCollection = db.collection("users");

  // verificar que tenga el indice, y si no lo tiene crearlo
  if(!hasIndexEmail) {
    UserCollection.indexExists("userEmail_1", (err, rslt)=>{
        if(!rslt){
          UserCollection.createIndex(
            { userEmail: 1 },
            { unique: true, name:"userEmail_1"},
            (err, rslt)=>{
              console.log(err, rslt);
              hasIndexEmail = true;
            });
        } else {
          hasIndexEmail = true;
        }
    });
  }

  var userTemplate = {
    userEmail: "",
    userPswd: "",
    userName: "",
    userDateCreated: null,
    status:'ACT',
  }

    ///////////////////////////////////      ALL       /////////////////////////////////////////////////////////
  UserModel.getAll = (handler)=>{

    UserCollection.find({}).toArray(handler);
  }
  ///////////////////////////////////        NEW USER     /////////////////////////////////////////////////////////
  UserModel.addNew = (dataToAdd, handler)=>{
    var { useremail, userpswd, usernames} = dataToAdd;
    var userToAdd = Object.assign(
      {},
      userTemplate,
      {
        userEmail: useremail,
        userPswd: pswdGenerator(userpswd),
        userName: usernames,
        userDateCreated: new Date().getTime(),
        status: 'ACT',
        roles:["Invitado"]
      }
      );
    UserCollection.insertOne(userToAdd, (err, rslt)=>{
      if(err){
        return handler(err, null);
      }
      console.log(rslt);
      return handler(null, rslt.ops[0]);
    }); //insertOner
  }
  ///////////////////////////////////       UPDATE USER      /////////////////////////////////////////////////////////
  UserModel.update = ( dataToUpdate , handler )=>{
    var { _id, userpswd, usernames, newstatus, role} = dataToUpdate;
    var query = { "_id": new ObjectID(_id)};
    var updateCommad = {
      "$set":{
        userPswd: pswdGenerator(userpswd),
        userName: usernames,
        lastUpdated: new Date().getTime(),
        status: newstatus,
        roles:[role]
        
      },
      "$inc" :{
        "updates": 1
      }
    };
    UserCollection.updateOne(
      query,
      updateCommad,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );// updateOne
  }
  ///////////////////////////////////     DELETE USER        /////////////////////////////////////////////////////////
  UserModel.deleteByCode = (id, handler)=>{
    var query = {"_id": new ObjectID(id)};
    UserCollection.deleteOne(
      query,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    ); //deleteOne
  }
  ///////////////////////////////////   FIND USER          /////////////////////////////////////////////////////////
  UserModel.getById = (id, handler) => {
    var query = { "_id": new ObjectID(id) };
    UserCollection.findOne(
      query,
      (err, doc) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, doc);
      }
    ); //findOne
  }
  ///////////////////////////////////    LOGIN         /////////////////////////////////////////////////////////
  UserModel.comparePswd = (hash, raw)=>{
    return bcrypt.compareSync(raw, hash);
  }

  UserModel.getByEmail = (email, handler)=>{
    var query = {"userEmail":email};
    var projection = { "userEmail": 1, "userPswd": 1, "userName":1};
    UserCollection.findOne(
      query,
      {"projection":projection},
      (err, user)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, user);
      }
    )
  }

  return UserModel;
}