'use strict'

var sql = require('mssql');

function ExecuteSQL(query,res)
{
  	new sql.Request().query(query, (err2,result) => {

      if (err2 == null)
      {
        	res.status(200).send(result.recordset);
      }
      else
      {
        	res.status(500).send({ message : err2 });	
      }
  });
}

 /* 
  07.01.2018  - Reconexión a BBDD Producción
 */
function estancias(req,res){

  var cliente = req.params.cli;
  
  var query = "select idrow,descripcion from [solarmanes_dev].[dbo].[sol_articulos_estancias]";
	ExecuteSQL(query,res);
}

function cajones(req,res){

  var cliente = req.params.cli;
  
  var query = "select idrow,descripcion from [solarmanes_dev].[dbo].[vw_articulos_cajones] where cliente="+cliente;
  ExecuteSQL(query,res);
}

function guias(req,res){

  var cliente = req.params.cli;
  
  var query = "select idrow,descripcion from [solarmanes_dev].[dbo].[sol_articulos_guias]";
  ExecuteSQL(query,res);
}

 /* 
  08.01.2018  - Reconexión a BBDD Producción
 */
function accion(req,res){

     var cliente = req.params.cli;
     var producto = (req.params.pro == null) ? 1 : req.params.pro; 

     if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente asociado a la petición'});
     } 
     else 
     {
        var query = "select idrow as id,descripcion as text from [solarmanes_dev].[dbo].[vw_accionamientos_cliente] where cliente="+cliente+" and producto="+producto;

        console.log(query);

        ExecuteSQL(query,res);
     }     
}



/* 
  08.01.2018  - Reconexión a BBDD Producción
 */
function accionT(req,res){

      var cliente = req.params.cli;
      var idrow = req.params.idrow;
      var producto = (req.params.pro == null) ? 1 : req.params.pro;

     if (cliente == null && idrow == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
      /*
        var query = "select id,[solarmanes_dev].[dbo].fn_AccionamientoTipo_Cliente(id,1) as text from [solarmanes_dev].[dbo].[SOL_ARTICULOS_ACCIONAMIENTOS_TIPOS] where idrow=" + idrow;
        query += "and not id in (select id from [solarmanes_dev].[dbo].[SOL_ARTICULOS_ACCIONAMIENTOS_TIPOS_CLIENTES_EXCLUIDOS] ";
        query += " where cliente="+cliente+")";
      */

        /* MODIFIED VFF 17.12.2019 */
        /* MODIFIED VFF 12.05.2022 */
        
        var query = "select id,TipoCliente as text from [solarmanes_dev].[dbo].[vw_accionamientosmarcas_clientes] where idrow="+idrow+" and cliente="+cliente + " and producto=" + producto;
        query += " order by TipoCliente";
       

        /* MODIFIED VFF 25.05.2022 */
        /*
        var query = "select id,accionamiento as text from [solarmanes_dev].[dbo].[vw_accionamientos_colores] where cliente="+cliente + " and producto=" + producto + " and tipoidrow="+idrow; 
        query += " group by id,accionamiento";
         */
        console.log(query);
        ExecuteSQL(query,res);
      }
}

/* 
  08.01.2018  - Reconexión a BBDD Producción
 */
function accionC(req,res){

      var cliente = req.params.cli;
      var acc = req.params.acc;
      var tipo = req.params.tipo;
      var producto = (req.params.pro == null) ? 1 : req.params.pro;

     if (cliente == null && idrow == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        var query = "select distinct(descripcion) as text,idrow as id from [solarmanes_dev].[dbo].[vw_accionamientos_colores] where cliente="+cliente+" and tipoidrow="+acc+" and id="+tipo;
        query += " and producto=" + producto;
        //query += "and not idrow in (select id from [solarmanes_dev].[dbo].[SOL_ARTICULOS_COLORES_MARCAS_CLIENTES_EXCLUIDOS] where cliente="+cliente+")";
       if (acc==1){
          query += " and cadena = 1";
        }

        console.log(query);
        ExecuteSQL(query,res);
      }
}

function soportes(req,res)
{
  var cliente = req.params.cli;

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
      var query = "select id,traduccion as text  from [solarmanes_dev].[dbo].[vw_soportes_clientes] where cliente="+cliente;
      /*
       var query = "select idrow as id,dbo.fn_Soportes_Cliente(idrow,"+cliente+") as text from [solarmanes_dev].[dbo].[SOL_ARTICULOS_SOPORTES] ";
          query += " where not idrow in (select id from [solarmanes_dev].[dbo].[SOL_ARTICULOS_SOPORTES_CLIENTES_EXCLUIDO] where cliente="+cliente+")";
       */
        ExecuteSQL(query,res);
    }
}

function soportesC(req,res)
{
  var cliente = req.params.cli;
  var id = req.params.id;

  if (cliente == null || id == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
       var query = "select idrow as id,color as text from [solarmanes_dev].[dbo].[vw_articulos_soportes_colores] where id="+id;
        ExecuteSQL(query,res);
    }
}

function contrapeso(req,res)
{
  var cliente = req.params.cli;
  

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
       //var query = "select idrow as id,descripcion as text from SOL_ARTICULOS_CONTRAPESO";
       //    query += " where not idrow in (select id from SOL_ARTICULOS_CONTRAPESO_CLIENTES_EXCLUIDOS where cliente="+cliente+")";

        var query = "select id,descripcion as text,precio,c1 from [SOLARMANES_DEV].[dbo].[SOL_ARTICULOS_CONTRAPESO_CLIENTES] where cliente="+cliente;
        ExecuteSQL(query,res);
    }

}

function contrapesoC(req,res)
{
  var cliente = req.params.cli;
  var id = req.params.id;

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        var query = "select id,color as text from [SOLARMANES_DEV].[dbo].[vw_contrapesos_colores] where contrapeso=" + id; 
        ExecuteSQL(query,res);
    }
}


function tejidos_producto(req,res)
{
  var cliente = req.params.cli;
  var producto = req.params.pro;

   if (cliente == null || producto == null)
   {

   }
   else 
    {
      var query = "select id,descripcion as text,isnull(codigoprov,'') as codigoprov from [SOLARMANES_DEV].[dbo].[SOL_ARTICULOS_TEJIDOS_CLIENTES] where cliente="+cliente+" and id in ";
      query += "(select tejido from  [SOLARMANES_DEV].[dbo].[sol_articulos_tejidos_clientes_productos] where cliente="+cliente+" and producto = "+producto+") order by descripcion ";
     
     
      ExecuteSQL(query,res);
    }
}


function tejidos_producto_id(req,res)
{
  var cliente = req.params.cli;
  var producto = req.params.pro;

   if (cliente == null || producto == null)
   {

   }
   else 
    {
      var query = "select id,descripcion as text,codigoprov from [SOLARMANES_DEV].[dbo].[SOL_ARTICULOS_TEJIDOS_CLIENTES] where cliente="+cliente+" and id in ";
      query += "(select tejido from  [SOLARMANES_DEV].[dbo].[sol_articulos_tejidos_clientes_productos] where impresion=1 and cliente="+cliente+" and producto = "+producto+") order by descripcion ";
      ExecuteSQL(query,res);
    }
}



function tejidos(req,res)
{
  var cliente = req.params.cli;
  var id = req.params.id;


  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        var query = "select id,descripcion as text,codigoprov from [SOLARMANES_DEV].[dbo].[SOL_ARTICULOS_TEJIDOS_CLIENTES] ";
        query += " where cliente="+cliente+" order by descripcion";
        ExecuteSQL(query,res);
    }
}

function tejidosC(req,res)
{
  var cliente = req.params.cli;
  var id = req.params.id;

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        if (cliente == '1')
        {
          var query = "select color as id,descripcion as text,ancmax,color_hex from [SOLARMANES_DEV].[dbo].[vw_tejidos_colores_2] where tejido="+id;
          query += " and cliente="+cliente+" and len(isnull(traduccion,'')) > 0 order by color";
        } 
        else 
        {
          var query = "select color as id,descripcion as text,ancmax,color_hex from [SOLARMANES_DEV].[dbo].[vw_tejidos_colores_2] where tejido="+id;
          query += " and cliente="+cliente+" and len(isnull(traduccion,'')) > 0 order by color";

        }
        ExecuteSQL(query,res);
    }
}

function tejidosCID(req,res)
{
  var cliente = req.params.cli;
  var id = req.params.id;

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        if (cliente == '1')
        {
          var query = "select color as id,descripcion as text,ancmax,color_hex from [SOLARMANES_DEV].[dbo].[vw_tejidos_colores] ";
          query +=" where impresiondigital=1 and impresiondigital2=1 and tejido="+id;
          query += " order by color";
        }
        else 
        {
          var query = "select color as id,descripcion as text,ancmax,color_hex from [SOLARMANES_DEV].[dbo].[vw_tejidos_colores_2] ";
          query += " where impresiondigital=1 and tejido="+id;
          query += " order by color";
        }

        ExecuteSQL(query,res);
    }
}



function tapas(req,res)
{
  var cliente = req.params.cli;
  var id = req.params.id;

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
      var query = "select id,traduccion as text from [solarmanes_dev].[dbo].[vw_tapas_clientes] where cliente="+cliente+" order by traduccion";
        /*
        var query = "select idrow as id,dbo.fn_Tapas_Cliente(idrow,1) as text from [solarmanes_dev].[dbo].[SOL_ARTICULOS_TAPAS]";
        query  += " where not idrow in (select id from [solarmanes_dev].[dbo].[SOL_ARTICULOS_TAPAS_CLIENTES_EXCLUIDOS] where cliente="+cliente+")";
        */
        ExecuteSQL(query,res);
    }
}

function tapasC(req,res)
{
  var cliente = req.params.cli;
  var id = req.params.id;

  if (cliente == null || id == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        var query = "select id,color as text from [solarmanes_dev].[dbo].[vw_articulos_tapas] where idrow="+id;
        ExecuteSQL(query,res);
    }
}

function posMando(req,res)
{
  var cliente = req.params.cli;
 

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        var query = " select idrow as id,descripcion as text from [solarmanes_dev].[dbo].[SOL_ARTICULOS_POSICIONMANDO]";
        ExecuteSQL(query,res);
    }
}

function salTejido(req,res)
{
  var cliente = req.params.cli;
 

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        var query = "select idrow as id,descripcion as text from [solarmanes_dev].[dbo].[sol_articulos_salidatejido]";
        ExecuteSQL(query,res);
    }
}

function radiomandos(req,res)
{
  var cliente = req.params.cli;
 

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        var query = "select  id,descripcion as text,precio,c1,producto,modelo from [SOLARMANES_DEV].[dbo].[sol_articulos_accionamientos_radio_tipo_cliente] ";
        query += " where cliente=1 and producto=1 order by producto,descripcion";
        ExecuteSQL(query,res);
    }
}

function radiomandos2(req,res)
{
  var cliente = req.params.cli;
 

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        var query = "select  id,descripcion as text,precio,c1,producto,modelo from [SOLARMANES_DEV].[dbo].[sol_articulos_accionamientos_radio_tipo_cliente] ";
        query += " where cliente=1 order by producto,descripcion";
        ExecuteSQL(query,res);
    }
}

function tubos(req,res)
{
  var cliente = req.params.cli;
 

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        var query =  "select idrow as id,descripcion as text,anchomax as ancmax from [solarmanes_dev].[dbo].[sol_articulos_tubos] ";
        query  += " where not idrow in (select id from [solarmanes_dev].[dbo].[sol_articulos_tubos_clientes_excluidos] where cliente="+cliente+") "; 
        ExecuteSQL(query,res);
    }
}

function altCadena(req,res)
{
  var cliente = req.params.cli;
 

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        var query =  "select value as id,descripcion as text from [solarmanes_dev].[dbo].[sol_articulos_accionamientos_cadena] where tipo='C' order by value";
        ExecuteSQL(query,res);
    }
}

function altCadenaM(req,res)
{
  var cliente = req.params.cli;
 

  if (cliente == null)
     {
        res.status(500).send({message:'No existe cliente o idrow asociado a la petición'});
     } 
     else 
     {
        var query =  "select value as id,descripcion as text from [solarmanes_dev].[dbo].[sol_articulos_accionamientos_cadena] where tipo='M' order by value";
        ExecuteSQL(query,res);
    }
}


function existePromocion(req,res)
{
    var cliente = req.params.cli;
    var centro  = req.params.cent;

    if (cliente != null && centro != null)
    {
     var query = "select count(*) as existe from [solarmanes_dev].[dbo].[vw_nh_clientes_promociones] ";
     query += "where idcliente="+cliente+" and idrow="+centro+" and promocion_activa=1";
     query += " and desde<=getdate()";
     ExecuteSQL(query,res);
    }
}


function datosPromocion(req,res)
{
    var cliente = req.params.cli;
    var centro  = req.params.cent;
    if (cliente != null && centro != null)
    {
     var query = "select promocion_coeficiente,promocion_coeficiente2,promocion_modificapvp,promocion_modificapvc,desde,hasta,promocion_mensaje from [solarmanes_dev].[dbo].[vw_nh_clientes_promociones] where idcliente="+cliente+" and idrow="+centro+" and promocion_activa=1";
     ExecuteSQL(query,res);
    }
}


function tejidos_producto_web(req,res)
{
  var cliente = req.params.cli;
  var producto = req.params.pro;

   if (cliente == null || producto == null)
   {

   }
   else 
    {
      /*
      var query = "select id,descripcion as text,isnull(codigoprov,'') as codigoprov from [SOLARMANES_DEV].[dbo].[SOL_ARTICULOS_TEJIDOS_CLIENTES] where cliente="+cliente+" and id in ";
      query += "(select tejido from  [SOLARMANES_DEV].[dbo].[sol_articulos_tejidos_clientes_productos] where cliente="+cliente+" and producto = "+producto+") ";
      query += " and not id in (14,15,18,32,42,51,59) order by descripcion ";
     */
     var query = "select cli.id,cli.descripcion as text,isnull(cli.codigoprov,'') as codigoprov,tej.opacidad,tej.info_tecnica,tej.uso_recomendado ";
    query += " from [SOLARMANES_DEV].[dbo].[SOL_ARTICULOS_TEJIDOS_CLIENTES] cli ";
    query += " inner join [SOLARMANES_DEV].[dbo].[sol_articulos_tejidos] tej on tej.idrow = cli.id ";
    query += " where cli.cliente="+cliente+" and cli.id in ";
    query += " (select tejido from  [SOLARMANES_DEV].[dbo].[sol_articulos_tejidos_clientes_productos] ";
    query += " where cliente="+cliente+" and producto = 1) ";
    query += " and not cli.id in (14,15,18,32,42,51,59) order by cli.descripcion ";

     
      ExecuteSQL(query,res);
    }
}


function tejidos_producto_id_web(req,res)
{
  var cliente = req.params.cli;
  var producto = req.params.pro;

   if (cliente == null || producto == null)
   {

   }
   else 
    {
      /*
      var query = "select id,descripcion as text,codigoprov from [SOLARMANES_DEV].[dbo].[SOL_ARTICULOS_TEJIDOS_CLIENTES] where cliente="+cliente+" and id in ";
      query += "(select tejido from  [SOLARMANES_DEV].[dbo].[sol_articulos_tejidos_clientes_productos] where impresion=1 and cliente="+cliente+" and producto = "+producto+") ";
      query += " and not id in (14,15,18,32,42,51,59) order by descripcion ";
      */
      var query = "select cli.id,cli.descripcion as text,isnull(cli.codigoprov,'') as codigoprov,tej.opacidad,tej.info_tecnica,tej.uso_recomendado ";
    query += " from [SOLARMANES_DEV].[dbo].[SOL_ARTICULOS_TEJIDOS_CLIENTES] cli ";
    query += " inner join [SOLARMANES_DEV].[dbo].[sol_articulos_tejidos] tej on tej.idrow = cli.id ";
    query += " where cli.cliente="+cliente+" and cli.id in ";
    query += " (select tejido from  [SOLARMANES_DEV].[dbo].[sol_articulos_tejidos_clientes_productos] ";
    query += " where impresion=1 and cliente="+cliente+" and producto = 1) ";
    query += " and not cli.id in (14,15,18,32,42,51,59) order by cli.descripcion ";
      ExecuteSQL(query,res);
    }
}





module.exports = {
    estancias,
	  accion,
    accionT,
    accionC,
    soportes,
    soportesC,
    contrapeso,
    contrapesoC,
    tejidos,
    tejidosC,
    tejidosCID,
    tapas,
    tapasC,
    posMando,
    salTejido,
    radiomandos,
    radiomandos2,
    tubos,
    altCadena,
    altCadenaM,
    tejidos_producto,
    tejidos_producto_id,
    existePromocion,
    datosPromocion,
    tejidos_producto_web,
    tejidos_producto_id_web,
    cajones,
    guias
}

