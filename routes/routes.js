'use strict'

var express = require('express');


var multipart = require('connect-multiparty');
var LM = require('../controllers/sm/lm/leroymerlin');
var Best = require('../controllers/sm/lm/bestellungen');
var Budget = require('../controllers/sm/lm/budget');
var TarifasController = require('../controllers/sm/lm/tarifas');
var FabricacionController = require('../controllers/sm/lm/fabricacion');

var md_upload = multipart({ uploadDir: './uploads/articles'});


var api = express.Router();


/* AUTHENTICATE */
var AuthController = require('../controllers/common/users');
api.post('/authenticate',AuthController.Authenticate);


api.get('/accion/:cli',LM.accion);
/* VFF 12.05.2022 */
api.get('/accion/:cli/:pro',LM.accion);


api.get('/accionT/:cli/:idrow/:pro',LM.accionT);

api.get('/accionC/:cli/:acc/:tipo',LM.accionC);
/* VFF 12.05.2022 */
api.get('/accionC/:cli/:acc/:tipo/:pro',LM.accionC);

api.get('/soportes/:cli',LM.soportes);
api.get('/soportesC/:cli/:id',LM.soportesC);

api.get('/contrapeso/:cli',LM.contrapeso);
api.get('/contrapesoC/:cli/:id/',LM.contrapesoC);

api.get('/tejidos/:cli',LM.tejidos);
api.get('/tejidosC/:cli/:id',LM.tejidosC);
api.get('/tejidosCID/:cli/:id',LM.tejidosCID);
api.get('/tejidos_producto/:cli/:pro',LM.tejidos_producto);
api.get('/tejidos_producto_id/:cli/:pro',LM.tejidos_producto_id);

api.get('/tapas/:cli',LM.tapas);
api.get('/tapasC/:cli/:id',LM.tapasC);

api.get('/posMando/:cli',LM.posMando);
api.get('/salTejido/:cli',LM.salTejido);

api.get('/radiomandos/:cli',LM.radiomandos);
api.get('/radiomandos2/:cli',LM.radiomandos2);

api.get('/tubos/:cli',LM.tubos);

api.get('/altCadena/:cli',LM.altCadena);
api.get('/altCadenaM/:cli',LM.altCadenaM);

api.get('/estancias/:cli',LM.estancias);

api.get('/cajones/:cli',LM.cajones);
api.get('/guias/:cli',LM.guias);

api.get('/tarifa_calculate/:cliente/:tubo/:tejido/:marca/:ancho/:alto/:impresion/:ancholama/:producto',TarifasController.calculate);
api.get('/tarifa_calculate2/:cliente/:tubo/:tejido/:marca/:ancho/:alto/:impresion/:ancholama/:producto/:centro/:cantidad',TarifasController.calculate2);
api.get('/tarifa_calculate3/:cliente/:tubo/:tejido/:marca/:ancho/:alto/:impresion/:ancholama/:producto/:centro/:cantidad/:subproducto',TarifasController.calculate3);
api.post('/tarifa_calculate4',TarifasController.calculate4);


api.get('/contrapeso_tarifa/:contrapeso/:ancho',TarifasController.contrapeso);
api.get('/alturacadena_tarifa/:cadena/:cliente/:altura',TarifasController.alturacadena);

api.get('/paneljapones_tarifa/:vias/:cliente/:altura/:cantidad',TarifasController.paneljapones);

api.get('/mecanismo_vertical/:alama/:ancho/:cantidad',TarifasController.mecanismo_vertical);
api.get('/vertical_st_tarifa/:ancholama/:tejido/:alto/:lamas',TarifasController.Vertical_ST_Tarifa);
api.get('/accesorio_tarifa/:idrow/:ancho/:cantidad',TarifasController.tarifa_accesorio);

api.get('/fecha_fab/:cliente/:tejido/:producto/:entrega',FabricacionController.fechafabricacion);

api.get('/existePromocion/:cli/:cent',LM.existePromocion);
api.get('/datosPromocion/:cli/:cent',LM.datosPromocion);

api.get('/test',TarifasController.Test);
api.get('/c1_sum/:c1/:c2/:c3/:c4/:c5/:c6/:c7/:c8',TarifasController.C1_Sum);
api.get('/c1_mult/:c1/:mult',TarifasController.C1_Multiply);
api.post('/c1_sumatory',TarifasController.C1_Sumatory);
   

/* BESTELLUNGEN */
api.post('/bestellungen_hinzu/:cli', Best.bestellungen_hinzu);
api.post('/bestellungen_hinzu2/:cli/:ref', Best.bestellungen_hinzu2);
api.post('/bestellungen_hinzu3/:cli/:ref', Best.bestellungen_hinzu3);
api.get('/bestellungen', Best.bestellungen);

api.get('/bestellungen_entrega/:cliente/:entrega',Best.bestellungen_entrega);
api.post('/bestellungen_entrega',Best.bestellungen_entrega_post);



/* BUDGET */
api.get('/budget', Budget.budget);
api.post('/budget_hinzu/:cli', Budget.budget_hinzu);
api.post('/budget_hinzu2/:cli/:ref', Budget.budget_hinzu2);

api.get('/budget_entrega/:cliente/:entrega',Budget.budget_entrega);
api.post('/budget_entrega',Budget.budget_entrega_post);
api.get('/budget_delete/:idrow',Budget.budget_delete);

api.get('/budget_herunterladen_T1/:idrow',Budget.budget_herunterladen_T1);
api.get('/budget_herunterladen_T2/:idrow',Budget.budget_herunterladen_T2);
api.get('/budget_herunterladen_T3/:idrow',Budget.budget_herunterladen_T3);
api.get('/budget_herunterladen_T4/:idrow',Budget.budget_herunterladen_T4);
api.get('/budget_herunterladen_T6/:idrow',Budget.budget_herunterladen_T6);


api.get('/pdf_image/:idrow',Best.bestellung_image);
api.get('/pdf_image2/:idrow',Best.bestellung_image2);

api.get('/bestellung_file/uploads/b2b/:idrow/:ref',Best.getProcessedFile);

module.exports = api;