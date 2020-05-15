var express = require("express");
var router = express.Router();

function fichaInit(db) {
  var fichaModel = require("../../../models/fichamodel")(db);
  ///////////////////////////////////        all     /////////////////////////////////////////////////////////

  router.get('/all', (req, res) => {
    fichaModel.getAll((err, users) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          "error": "error"
        });
      }
      return res.status(200).json(users);
    });
  }); // get fichas/all
  ///////////////////////////////////        FIND BY ID     /////////////////////////////////////////////////////////

  router.get('/find/:id', (req, res) => {
    var { id: _id } = req.params;
    var id = _id || '';
    fichaModel.getFichaById(id, (err, doc) => {
      if (err) {
        return res.status(500).json({});
      }
      return res.status(200).json(doc);
    })
  })
  ///////////////////////////////////        FIND BY INCIDENTE   /////////////////////////////////////////////////////////

  router.get('/find/:incidente', (req, res) => {
    var {incidente} = req.params;
    var incid = incidente || '';
    fichaModel.getFichaByIncidente(incid, (err, doc) => {
      if (err) {
        return res.status(500).json({});
      }
      return res.status(200).json(doc);
    })
  })

///////////////////////////////////        ADD FICHA     /////////////////////////////////////////////////////////
  router.post('/add', (req, res)=>{
    var {ticket, Latitud, Longitud, descripcion, sospechoso, departamento, municipio, incidente, expediente, armas, informacion_externa} = req.body;
    var insertCurated= {};
    console.log("post add ficha par 1");
    if (ticket && !isNaN(ticket)) {
      insertCurated.ticket = parseFloat(ticket);
    }
    if (Latitud && !isNaN(Latitud)) {
      insertCurated.Latitud = parseFloat(Latitud);
    }
    if (Longitud && !isNaN(Longitud)) {
      insertCurated.Longitud = parseFloat(Longitud);
    }
    if(descripcion && !(/^\s*$/).test(descripcion)){
      insertCurated.descripcion = descripcion;
    }
    if(sospechoso && !(/^\s*$/).test(sospechoso)){
      insertCurated.sospechoso = sospechoso;
    }
    if(departamento && !(/^\s*$/).test(departamento)){
      insertCurated.departamento = departamento;
    }
    if(municipio && !(/^\s*$/).test(municipio)){
      insertCurated.municipio = municipio;
    }
    if(incidente && !(/^\s*$/).test(incidente)){
      insertCurated.incidente = incidente;
    }
    if(expediente && !(/^\s*$/).test(expediente)){
      insertCurated.expediente = expediente;
    }
    if(armas && !(/^\s*$/).test(armas)){
      insertCurated.armas = armas;
    }
    if(informacion_externa && !(/^\s*$/).test(informacion_externa)){
      insertCurated.informacion_externa = informacion_externa;
    }
    fichaModel.addNewFicha(
      req.user._id,
      req.user.userName,
      insertCurated,
      (err, rslt)=>{
        if(err){
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      }
    );
  });



///////////////////////////////////        UPDATE FICHA     /////////////////////////////////////////////////////////
  router.put('/upd/:id', (req, res)=>{
    var {Latitud, Longitud, descripcion, sospechoso, departamento, municipio, incidente, expediente, armas, informacion_externa} = req.body;
    var updateCurated = {};
    if (Latitud && !isNaN(Latitud)) {
      updateCurated.Latitud = parseFloat(Latitud);
    }
    if (Longitud && !isNaN(Longitud)) {
      updateCurated.Longitud = parseFloat(Longitud);
    }
    if(descripcion && !(/^\s*$/).test(descripcion)){
      updateCurated.descripcion = descripcion;
    }
    if(sospechoso && !(/^\s*$/).test(sospechoso)){
      updateCurated.sospechoso = sospechoso;
    }
    if(departamento && !(/^\s*$/).test(departamento)){
      updateCurated.departamento = departamento;
    }
    if(municipio && !(/^\s*$/).test(municipio)){
      updateCurated.municipio = municipio;
    }
    if(incidente && !(/^\s*$/).test(incidente)){
      updateCurated.incidente = incidente;
    }
    if(expediente && !(/^\s*$/).test(expediente)){
      updateCurated.expediente = expediente;
    }
    if(armas && !(/^\s*$/).test(armas)){
      updateCurated.armas = armas;
    }
    if(informacion_externa && !(/^\s*$/).test(informacion_externa)){
      updateCurated.informacion_externa = informacion_externa;
    }
    fichaModel.updateFicha(
      req.params.id,
      updateCurated,
      (err, rslt) => {
        if (err) {
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      }
    );
  });
///////////////////////////////////        DELETE     /////////////////////////////////////////////////////////
  router.put('/del/:id', (req, res) => {
    fichaModel.deleteFicha(
      req.params.id,
      req.user._id,
      req.user.userName,
      (err, rslt) => {
        console.log(req.params.id);
        if (err) {
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      }
    );
  });

  return router;
}

module.exports = fichaInit;
