'use strict'

const html = __dirname + '/dist/';


var https = require('https');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var express = require('express');
var sql = require('mssql');
var cors = require("cors");

var app = express();

var options = {
    key : fs.readFileSync('./Certificado/manzasm.key'),
    cert: fs.readFileSync('./Certificado/manzasm.crt'),
    ca : fs.readFileSync('./Certificado/manzasm.ca.crt')
};
/*
var AllowCrossDomain = function(req,res,next){
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type,Authorization');
    res.header('Access-Control-Allow-Credentials',true);
    next();
};
*/

var master_routes = require('./routes/routes');
var master_linkroutes = require('./routes/link_routes');

app.use(compression());
app.use(bodyParser.urlencoded({limit: '300mb',extended:true}));
app.use(bodyParser.json({limit: '300mb'}));
app.use(bodyParser.raw());
app.use(cors());
app.use(express.static(html));

var porth = 3011;

//var port = process.env.PORT || 3002;


var config = {
    user : 'sa',
    password: 'Cq4iz5Tsq9',
    server : '127.0.0.1',
    database : 'SOLARMANES',
    language : 'es',
    options : {
        encrypt : false,
        enableArithAbort : true
    },
    connectionTimeout: 400000,
    requestTimeout: 400000,
    pool: {
        idleTimeoutMillis: 400000,
        max: 100
    }
};


var connection = sql.connect(config, function (err) {
    if (err) {
        console.log("NO ES POSIBLE CONECTAR CON LA BASE DE DATOS");
        throw err;
    }
});

module.exports = connection;

app.use('/linkapi',master_linkroutes);
app.use('/api',master_routes);


app.use(function(req, res, next){  
    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml', 'text');
    if(accept !== 'html'){
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== ''){
        return next();
    }
    fs.createReadStream(html + 'index.html').pipe(res);
});


var httpsServer = https.createServer(options, app);

httpsServer.listen(porth, function(){
      console.log('Port:' + porth);
      console.log('Html:' + html);
    });


/*
app.listen(port, function(){
	  console.log('Port:' + port);
	  console.log('Html:' + html);
	});
	
    */
	  