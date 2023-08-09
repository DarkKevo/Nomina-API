import pdf  from 'html-pdf';
import mysql from 'mysql2';
import { host, port, username, password } from '../../Config/MySqlConfig.js';
import express from 'express';

export const descargarpdf = async (req, res) => {
   const conexion = mysql.createConnection({
      host: host,
      port: port,
      user: username,
      password: password,
      multipleStatements: true,
   });
   try {
      await new Promise((resolve, reject) => {
         conexion.connect(function (err) {
            if (err) {
               console.error('Error de conexion: ' + err.stack);
               reject(err);
            } else {
               resolve();
            }
         });
      });




  
      const query = `
      SELECT 
      cedula
      ,nombre 
      ,horas_trabajadas
      ,monto_base
      ,horas_extras
      ,monto_extra
      ,monto_deduccion
      ,monto_bonificacion
      ,pagoTotal
      ,date_format(fecha_ini, "%Y-%m-%d")  fecha_ini
      ,date_format(fecha_cul, "%Y-%m-%d")  fecha_cul
  FROM nomina_database.respaldo_pagos 
  where fecha_ini = '2023-08-01' and fecha_cul = '2023-08-07'`;
      
      const result = await new Promise((resolve, reject) => {
         conexion.query(query, (err, result) => {
            if (err) {
               console.log(err);
               reject(err);
            } else {
               resolve(result);
            }
         });
      });

    //  conexion.end();

      // Formatear los datos obtenidos para crear el contenido del archivo
      //const nombre = result.map((item) => item.nombre).join('\n');
  
  
  
  
  
    let  query_empresa = `
      SELECT 
	rif
    ,nombre universidad
    ,direccion
    ,imageURL  logo
 FROM nomina_database.empresas
 where nombre = 'Universidad Valle de Momboy'`;
      
      let result_empresa = await new Promise((resolve, reject) => {
         conexion.query(query_empresa, (err, result_empresa) => {
            if (err) {
               console.log(err);
               reject(err);
            } else {
               resolve(result_empresa);
            }
         });
      });

  
  
  

      conexion.end();


      let suma_total = 0;
      let content = `
      <!DOCTYPE html>
        <html>
        <head>
        <style>
        body {
         font-family: sans-serif;
         margin: 0;
         padding: 2cm;
         
      }
      .container {
         width: 600px;
         margin: 0 auto;
      }
      .header {
         background-color: white;
         color: #fff;
         padding: 5px;
      }
      .content {
         padding: 5px;
      }
      .footer {
         background-color: #ccc;
         padding: 5px;
         text-align: center;
      }
      table {
         margin: 0 auto;
         
      }
      td, th {
         border: solid;
         padding: 8px;
         font-size: 9px;
      }
      .break {
         page-break-after: always;
      }
   </style></head>
<body>
   <div class="container">
      <div class="header">
         
      </div>
      <div class="content">
      <img src="${ result_empresa[0].logo}" alt="Flowers in Chania" width="60" height="60">
      <p>Rif: ${ result_empresa[0].rif}
      <br> 
      Universidad: ${result_empresa[0].universidad}
      <br>
      Direccion: ${result_empresa[0].direccion}
      <br>
     
       </p>
       <h2 style="text-align:center;" >Desde ${result[0].fecha_ini} Hasta ${result[0].fecha_cul}</h2>
      <table style="font-family: Arial, Helvetica,  sans-serif; border-collapse: collapse; transform: translateX(50%);">
            <tr>
               <th style="border: solid;">Cedula</th>
               <th style="border: solid;">Nombres</th>
               <th style="border: solid;">Horas trabajadas</th>
               <th style="border: solid;">Monto H. Trabajadas</th>
               <th style="border: solid;">Horas extras</th>
               <th style="border: solid;">Monto extra</th>
               <th style="border: solid;">Deduccion</th>
               <th style="border: solid;">Bonificacion</th>
               <th style="border: solid;">Total</th>
            </tr>`;

  
      result.forEach(function(item) {
        content = content + `<tr>
                <td style="border: solid;">${item.cedula}</td>
                <td style="border: solid;">${item.nombre}</td>
                <td style="border: solid;">${item.horas_trabajadas}</td>
                <td style="border: solid;">${item.monto_base}</td>
                <td style="border: solid;">${item.horas_extras}</td>
                <td style="border: solid;">${item.monto_extra}</td>
                <td style="border: solid;">${item.monto_deduccion}</td>
                <td style="border: solid;">${item.monto_bonificacion}</td>
                <td style="border: solid;">${item.pagoTotal}</td>
            </tr>`  ;
            suma_total = suma_total + item.pagoTotal;
      });

                     
     content  = content +`</table>
      </div>
      <h2 style="float: right;">Total pagado: ${suma_total}</h2>
     
   </div>
</body>
</html>
      `;

                      console.log('pdf');
      
      pdf.create(content).toFile(`./Nomina_${"2023"}_${"2023"}_.pdf`, function(err, res) {
          if (err){
              console.log(err);
          } else {
              console.log(res);
             // res.send(res);
          }
      });

  } catch (error) {
    console.error(error);
    conexion.end();
    res.status(500).send({ error: 'Error en la consulta' });
  }
};



































