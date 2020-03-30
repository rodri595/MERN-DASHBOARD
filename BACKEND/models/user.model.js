var ObjectID = require("mongodb").ObjectID;
var bcrypt = require("bcrypt");
var hasIndexEmail = false;

function pswdGenerator(pswdRaw) {
  var hashedPswd = bcrypt.hashSync(pswdRaw, 10);
  return hashedPswd;
}

module.exports = db => {
  var userModel = {};
  var userCollection = db.collection("users");

  //verificar que tenga el indice, y si no lo tiene crearlo
  if (!hasIndexEmail) {
    userCollection.indexExists("userEmail_1", (err, rslt) => {
      if (!rslt) {
        userCollection.createIndex(
          {
            userEmail: 1
          },
          {
            unique: true,
            name: "userEmail_1"
          },
          (err, rslt) => {
            console.log(err, rslt);
            hasIndexEmail = true;
          }
        );
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
  };
  userModel.getAll = handler => {
    userCollection.find({}).toArray(handler);
  };

  userModel.addNew = (dataToAdd, handler) => {
    var { useremail, userpswd, usernames } = dataToAdd;
    var userToAdd = Object.assign({}, userTemplate, {
      userEmail: useremail,
      userPswd: pswdGenerator(userpswd),
      userCompleteName: usernames,
      userDateCreated: new Date().getTime()
    });
    userCollection.insertOne(userToAdd, (err, rslt) => {
      if (err) {
        return handler(err, null);
      }
      console.log(rslt);
      return handler(null, rslt.ops[0]);
    }); //insertOner
  };

  userModel.update = (dataToUpdate, handler) => {
    var { _id, userpswd, usernames } = dataToUpdate;
    var query = {
      _id: new ObjectID(_id)
    };
    var updateCommad = {
      $set: {
        userPswd: pswdGenerator(userpswd),
        userCompleteName: usernames,
        lastUpdated: new Date().getTime()
      },
      $inc: {
        updates: 1
      }
    };
    userCollection.updateOne(query, updateCommad, (err, rslt) => {
      if (err) {
        return handler(err, null);
      }
      return handler(null, rslt.result);
    }); // updateOne
  };

  userModel.deleteByCode = (id, handler) => {
    var query = {
      _id: new ObjectID(id)
    };
    userCollection.deleteOne(query, (err, rslt) => {
      if (err) {
        return handler(err, null);
      }
      return handler(null, rslt.result);
    }); //deleteOne
  };

  userModel.getById = (id, handler) => {
    var query = {
      _id: new ObjectID(id)
    };
    userCollection.findOne(query, (err, doc) => {
      if (err) {
        return handler(err, null);
      }
      return handler(null, doc);
    }); //findOne
  };

  userModel.comparePswd = (hash, raw) => {
    return bcrypt.compareSync(raw, hash);
  };

  userModel.getByEmail = (email, handler) => {
    var query = {
      userEmail: email
    };
    var projection = {
      userEmail: 1,
      userPswd: 1,
      userCompleteName: 1
    };
    userCollection.findOne(
      query,
      {
        projection: projection
      },
      (err, user) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, user);
      }
    );
  };

  return userModel;
};
