'use strict'

var express = require('express');

var LM = require('../controllers/sm/lm/leroymerlin');
var Best = require('../controllers/sm/lm/bestellungen');
var LM_PJ = require('../controllers/sm/lm/leroymerlin_japones');
var LM_PV = require('../controllers/sm/lm/leroymerlin_vertical');
var Tarifs = require('../controllers/sm/lm/tarifas.js');


var linkapi = express.Router();


linkapi.get('/tejidos_producto/:cli/:pro',LM.tejidos_producto_web);
linkapi.get('/tejidos_producto_id/:cli/:pro',LM.tejidos_producto_id_web);
linkapi.get('/tejidos_producto_web/:cli/:pro',LM.tejidos_producto_web);
linkapi.get('/tejidos_producto_id_web/:cli/:pro',LM.tejidos_producto_id_web);

linkapi.get('/tejidosC/:cli/:id',LM.tejidosC);
linkapi.get('/tejidosCID/:cli/:id',LM.tejidosCID);

linkapi.get('/salTejido/:cli',LM.salTejido);

linkapi.get('/accion/:cli',LM.accion);
linkapi.get('/accionT/:cli/:idrow/:tipo',LM.accionT);
linkapi.get('/accionC/:cli/:acc/:tipo',LM.accionC);

linkapi.get('/soportes/:cli',LM.soportes);
linkapi.get('/soportesC/:cli/:id',LM.soportesC);

linkapi.get('/contrapeso/:cli',LM.contrapeso);
linkapi.get('/contrapesoC/:cli/:id/',LM.contrapesoC);

linkapi.get('/tapas/:cli',LM.tapas);
linkapi.get('/tapasC/:cli/:id',LM.tapasC);

linkapi.get('/posMando/:cli',LM.posMando);

linkapi.get('/radiomandos/:cli',LM.radiomandos);

linkapi.get('/tubos/:cli',LM.tubos);

linkapi.get('/altCadena/:cli',LM.altCadena);
linkapi.get('/altCadenaM/:cli',LM.altCadenaM);

linkapi.get('/estancias/:cli',LM.estancias);

linkapi.post('/bestellungen_hinzu2/:cli/:ref', Best.bestellungen_hinzu2);


linkapi.get('/japones_numerovias/',LM_PJ.Japones_NumeroVias);
linkapi.get('/japones_colormecanismo/',LM_PJ.Japones_ColorMecanismo);
linkapi.get('/japones_posicionmando/',LM_PJ.Japones_PosicionMando);
linkapi.get('/japones_recogida/',LM_PJ.Japones_Recogida);
linkapi.get('/japones_tipodesoporte/',LM_PJ.Japones_TipodeSoporte);
linkapi.get('/japones_contrapeso/',LM_PJ.Japones_Contrapeso);
linkapi.get('/japones_estancias/:cli',LM.estancias);

linkapi.get('/vertical_ancholama/',LM_PV.Vertical_AnchoLama);
linkapi.get('/vertical_posicionmecanismo/',LM_PV.Vertical_PosicionMecanismo);
linkapi.get('/vertical_colorriel/',LM_PV.Vertical_ColorRiel);
linkapi.get('/vertical_accionamiento/',LM_PV.Vertical_Accionamiento);
linkapi.get('/vertical_tiposoportes/',LM_PV.Vertical_TipoSoporte);
linkapi.get('/vertical_tiporecogida/',LM_PV.Vertical_TipoRecogida);


//api.get('/tarifa_calculate3/:cliente/:tubo/:tejido/:marca/:ancho/:alto/:impresion/:ancholama/:producto/:centro/:cantidad/:subproducto',TarifasController.calculate3);

linkapi.post('/tarif_get',Tarifs.getTarif);
linkapi.post('/ids_links',Tarifs.links);
linkapi.get('/test',Tarifs.Test);

linkapi.get('/bestellungen_reprocess/:idrow/:ref',Best.reprocessFile);




module.exports = linkapi;
