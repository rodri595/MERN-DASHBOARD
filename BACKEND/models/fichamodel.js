var ObjectID = require('mongodb').ObjectID;
var hasIndexFicha = false;

var fichaModelInit = function(db){
  var fichaModel = {};
  var fichaCollection = db.collection('fichas');
  if (!hasIndexFicha) {
    fichaCollection.indexExists("ficha_id_1", (err, rslt) => {
      if (!rslt) {
        fichaCollection.createIndex(
          { ticket: 1 },
          { name: "ficha_id_1" },
          (err, rslt) => {
            console.log(err, rslt);
            hasIndexFicha = true;
          });
      } else {
        hasIndexFicha = true;
      }
    });
  }
  fichaModel.pseudoSchema = {
    Latitud: 0,
    Longitud: 0,
    dateCreated:0,
    status:'ACT',
    descripcion: [],
    sospechoso:'',
    departamento:'',
    municipio:'',
    incidente:'',
    expediente:'',
    armas:'',
    informacion_externa:'',
    ticket:'',

  }

      ///////////////////////////////////      ALL       /////////////////////////////////////////////////////////
      fichaModel.getAll = (handler)=>{

        fichaCollection.find({}).toArray(handler);
      }




  ///////////////////////////////////        FIND BY ID     /////////////////////////////////////////////////////////
  fichaModel.getFichaById = (fichaId, handler) => {
      var filter= {"_id":new ObjectID(fichaId)};
      fichaCollection.findOne(filter, (err, doc)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        } else {
          return handler(null, doc);
        }
      });
  }; // getFichaById
  ///////////////////////////////////        FIND BY INCIDENTE     /////////////////////////////////////////////////////////
  fichaModel.getFichaByIncidente = (fichaId, handler) => {
      var filter= {"incidente": fichaId};
      fichaCollection.findOne(filter, (err, doc)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        } else {
          return handler(null, doc);
        }
      });
  }; // getFichaById
///////////////////////////////////        ADD FICHA     /////////////////////////////////////////////////////////
  fichaModel.addNewFicha = ( ownerId, ownerName, fichaInput, handler) => {
    var newFicha = {
      ...fichaModel.pseudoSchema,
      ...fichaInput
    }
    newFicha.dateCreated = new Date().getTime();
    newFicha.CreatedById= new ObjectID(ownerId);
    newFicha.CreatedByName= ownerName;
    fichaCollection.insertOne(newFicha, (err, rslt)=>{
      if(err){
        console.log(err);
        return handler(err, null);
      } else {
        return handler(null, rslt.ops[0]);
      }
    }); //insertOne
  }; //addNewFicha
///////////////////////////////////        UPDATE FICHA     /////////////////////////////////////////////////////////
  fichaModel.updateFicha = (fichaId, fichaInput, handler) => {
    var filter = { "_id": new ObjectID(fichaId) };
    var { Latitud, Longitud, descripcion, sospechoso, departamento, municipio, incidente, expediente, armas, informacion_externa, status} = fichaInput;
    var finalUpdate = {};
    if(Latitud){
      finalUpdate.Latitud = Latitud;
    }
    if(Longitud){
      finalUpdate.Longitud = Longitud;
    }
    if(descripcion){
      finalUpdate.descripcion = descripcion;
    }
    if(sospechoso){
      finalUpdate.sospechoso = sospechoso;
    }
    if(departamento){
      finalUpdate.departamento = departamento;
    }
    if(municipio){
      finalUpdate.municipio = municipio;
    }
    if(incidente){
      finalUpdate.incidente = incidente;
    }
    if(expediente){
      finalUpdate.expediente = expediente;
    }
    if(armas){
      finalUpdate.armas = armas;
    }
    if(informacion_externa){
      finalUpdate.informacion_externa = informacion_externa;
    }
    var updateCmd = { "$set": finalUpdate, "$inc" :{
      "updates": 1
    }};

    fichaCollection.findOneAndUpdate(filter, updateCmd, { returnOriginal: false }, (err, rslt) => {
      if (err) {
        console.log(err);
        return handler(err, null);
      } else {
        return handler(null, rslt.value);
      }
    })
  }; //

  ///////////////////////////////////        "delete" FICHA     /////////////////////////////////////////////////////////
  fichaModel.deleteFicha = (fichaId, ownerId, ownerName, handler) => {
    var filter = { "_id": new ObjectID(fichaId) };
    var updateCmd = { "$set": {
      "status":"DELETED",
      lastUpdated: new Date().getTime(),
      DeleteById: new ObjectID(ownerId),
      DeletedByName: ownerName
    },
    "$inc" :{
      "Deleted": 1
    }
    };

    fichaCollection.findOneAndUpdate(filter, updateCmd, { returnOriginal: false }, (err, rslt) => {
      if (err) {
        console.log(err);
        return handler(err, null);
      } else {
        return handler(null, rslt.value);
      }
    })
  }; //
  return fichaModel;
};

module.exports = fichaModelInit;
