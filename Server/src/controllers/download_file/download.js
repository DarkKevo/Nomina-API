import mysql from 'mysql2';
import { host, port, username, password } from '../../Config/MySqlConfig.js';
import express from 'express';
import fs from 'fs';

export const descargartxt = async (req, res) => {
   var id_file = req.body.id_file;
   var fecha_init = req.body.fecha_init;
   var fecha_final = req.body.fecha_final;
  
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
      select  
	      concat((cuenta)
         ,(f.separadores)
         ,((concat('V',(( LEFT('0000000000', 10 - length(cedula)))), cedula)))   
         ,(f.separadores)
         ,(concat(LEFT('0000000000', 15 - length((replace(round(pagoTotal,2),'.', '')))),(replace(round(pagoTotal,2),'.', ''))))
         ,(f.separadores)
         ,(nombre)) nombre
      from
      nomina_database.respaldo_pagos p
      ,nomina_database.setup_banco_file f
      where  fecha_pago >= '${fecha_init}'
      and fecha_pago    <= '${fecha_final}'
      and f.idfile = ${id_file}`;
      
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

      conexion.end();

      // Formatear los datos obtenidos para crear el contenido del archivo
      const contenido = result.map((item) => item.nombres).join('\n');

      // Ruta donde se guardará el archivo temporalmente
      const rutaArchivo = './quincena.txt';

      // Crear el archivo de texto localmente
      fs.writeFile(rutaArchivo, contenido, (err) => {
         if (err) {
            console.error('Error al crear el archivo de texto:', err);
            return res.status(500).send('Ocurrió un error al generar el archivo de texto.');
         }

      // Enviar el archivo como respuesta
      res.download(rutaArchivo, 'archivo_descargado.txt', (err) => {
        if (err) {
          console.error('Error al enviar el archivo de texto:', err);
          return res.status(500).send('Ocurrió un error al descargar el archivo.');
        }

        // Eliminar el archivo temporal después de enviarlo
        fs.unlink(rutaArchivo, (err) => {
          if (err) {
            console.error('Error al eliminar el archivo temporal:', err);
          }
        });
      });
    });
  } catch (error) {
    console.error(error);
    conexion.end();
    res.status(500).send({ error: 'Error en la consulta' });
  }
};


























