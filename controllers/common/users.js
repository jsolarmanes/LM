'use strict'

var bcrypt = require('bcrypt-nodejs');
var sql = require('mssql');
var services = require('../../services/jwt.js');

 

function Authenticate(req,res)
{

      
      var usuario = req.body.username;
      var password = req.body.password;
      var gettoken = req.body.gettoken;
      var ambito   = req.body.ambito;


      if (!req.body.gettoken){
        gettoken = "false";
      }

/*
      var sqlquery = "select idrow,password,empresa,subempresa,name,surname,role,email,ambito,integracion,isnull(url,'/routes') as url,code,nombre,";
      sqlquery += "(select nomfiscal from nh_clientes where idcliente=USERS.EMPRESA) as descempresa,";
      sqlquery += "(select nombre from NH_CLIENTES_DOMICILIOS where idrow=USERS.SUBEMPRESA) as descsubempresa ";
      sqlquery += "  from USERS where username='"+usuario+"'";
*/
      var sqlquery = "select idrow,password,empresa,subempresa,name,surname,role,email,ambito,integracion,isnull(url,'/routes') as url,code,nombre, ";
      sqlquery += "(select nomfiscal from [solarmanes_dev].[dbo].[nh_clientes] where idcliente=USERS.EMPRESA) as descempresa,";
      sqlquery += "(select nombre from [solarmanes_dev].[dbo].[NH_CLIENTES_DOMICILIOS] where idrow=USERS.SUBEMPRESA) as descsubempresa ";
      sqlquery += " from [solarmanes_dev].[dbo].[USERS] USERS where username='"+usuario+"'";
      
    
      new sql.Request().query(sqlquery, (err2,result) => {
        if (err2 == null)
        {
         
          if (result.recordset.length == 1)
          {
              var ipassword       = result.recordset[0].password;
              var empresa         = result.recordset[0].empresa;
              var subempresa      = result.recordset[0].subempresa;
              var idrow           = result.recordset[0].idrow;
              var name            = result.recordset[0].name;
              var surname         = result.recordset[0].surname;
              var role            = result.recordset[0].role;
              var email           = result.recordset[0].email;
              var descempresa     = result.recordset[0].descempresa;
              var descsubempresa  = result.recordset[0].descsubempresa;
              var ambito          = result.recordset[0].ambito;
              var integracion     = result.recordset[0].integracion;
              var username        = result.recordset[0].username;
              var url             = result.recordset[0].url;
              var code            = result.recordset[0].code;
              var nombre          = result.recordset[0].nombre;


              bcrypt.compare(password,ipassword, function(err,ret) {

                if (ret) 
                {


                  let user = {
                    idrow       : idrow,
                    name        : name,
                    surname     : surname,
                    email       : email,
                    role        : role,
                    empresa     : empresa,
                    subempresa  : subempresa,
                    ambito      : ambito,
                    integracion : integracion,
                    username    : username,
                    url         : url,
                    code        : code,
                    nombre      : nombre
                  } 

                  var token = services.createToken(user);

                  //name += " " + surname;
                  res.status(200).send({ret: 'OK',
                                        message:'Accepted',
                                        token:token,
                                        name:name,
                                        role:role,
                                        emp:empresa,
                                        subemp:subempresa,
                                        user:idrow,
                                        descemp:descempresa,
                                        descsubemp:descsubempresa,
                                        ambito:ambito,
                                        integracion:integracion,
                                        username:username,
                                        url:url,
                                        code:code,
                                        nombre:nombre});
                }
                else 
                {
                  res.status(500).send({ret: 'KO', message: 'User not exists/Password not right'});
                }
               });
            }
            else 
            {
              res.status(500).send({ret: 'KO', message: 'User not exists/Password not right'});
            }
        } 
        else {
          console.log(err2);
        }
      });
       
}



module.exports = {
	Authenticate
}

