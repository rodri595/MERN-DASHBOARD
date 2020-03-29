var ObjectID = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var hasIndexEmail = false;

function pswdGenerator(pswdRaw) {
  var hashedPswd = bcrypt.hashSync(pswdRaw, 10);
  return hashedPswd;
}


module.exports = (db) => {
  var securityModel = {}
  var securityCollection = db.collection("users");

  //verificar que tenga el indice, y si no lo tiene crearlo
  if (!hasIndexEmail) {
    securityCollection.indexExists("userEmail_1", (err, rslt) => {
      if (!rslt) {
        securityCollection.createIndex({
            userEmail: 1
          }, {
            unique: true,
            name: "userEmail_1"
          },
          (err, rslt) => {
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
    userCompleteName: "",
    userDateCreated: null
  }
  securityModel.getAll = (handler) => {
    // handler(err, docs)
    securityCollection.find({}).toArray(handler);
  }

  securityModel.addNew = (dataToAdd, handler) => {
    //handler(err, addedDocument)
    /*
    useremail:obetancourthunicah@gmail.com
    userpswd:12345678
    usernames:Orlando Betancourth
    lerolero:Lero Candelero
     */
    var {
      useremail,
      userpswd,
      usernames
    } = dataToAdd;
    var userToAdd = Object.assign({},
      userTemplate, {
        userEmail: useremail,
        userPswd: pswdGenerator(userpswd),
        userCompleteName: usernames,
        userDateCreated: new Date().getTime()
      }
    );
    securityCollection.insertOne(userToAdd, (err, rslt) => {
      if (err) {
        return handler(err, null);
      }
      console.log(rslt);
      return handler(null, rslt.ops[0]);
    }); //insertOner
  }

  securityModel.update = (dataToUpdate, handler) => {
    var {
      _id,
      userpswd,
      usernames
    } = dataToUpdate;
    var query = {
      "_id": new ObjectID(_id)
    };
    var updateCommad = {
      "$set": {
        userPswd: pswdGenerator(userpswd),
        userCompleteName: usernames,
        lastUpdated: new Date().getTime()
      },
      "$inc": {
        "updates": 1
      }
    };
    securityCollection.updateOne(
      query,
      updateCommad,
      (err, rslt) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    ); // updateOne
  }

  securityModel.deleteByCode = (id, handler) => {
    var query = {
      "_id": new ObjectID(id)
    };
    securityCollection.deleteOne(
      query,
      (err, rslt) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    ); //deleteOne
  }

  securityModel.getById = (id, handler) => {
    var query = {
      "_id": new ObjectID(id)
    };
    securityCollection.findOne(
      query,
      (err, doc) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, doc);
      }
    ); //findOne
  }

  securityModel.comparePswd = (hash, raw) => {
    return bcrypt.compareSync(raw, hash);
  }

  securityModel.getByEmail = (email, handler) => {
    var query = {
      "userEmail": email
    };
    var projection = {
      "userEmail": 1,
      "userPswd": 1,
      "userCompleteName": 1
    };
    securityCollection.findOne(
      query, {
        "projection": projection
      },
      (err, user) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, user);
      }
    )
  }

  return securityModel;
}