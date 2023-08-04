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
      concat( (e.numero_cuenta)
       ,f.separadores
       ,(concat('V',(( LEFT('0000000000', 10 - length(e.cedula)))), e.cedula))
        ,f.separadores
        ,(replace((concat((LEFT('0000000000', 15 - length((round(((c.salario/30)* count(h.fecha)),2))))), (round(((c.salario/30)* count(h.fecha)),2)))),'.',''))
        ,f.separadores
       ,(concat((concat(e.apellidos)), ',', concat(e.nombres)))) nombres  
   from 
   nomina_database.empleados e
   ,nomina_database.registro_horas h
   ,nomina_database.cargos c
   ,nomina_database.setup_banco_file f
   where h.idEmpleados = e.idempleados
   and c.idcargos = e.codigo_cargo
   and h.fecha >= '${fecha_init}'
   and h.fecha <= '${fecha_final}'
   and f.idfile = ${id_file}
   group by e.numero_cuenta, e.cedula, c.salario, e.horas_trabajadas, e.apellidos, e.nombres
   `;
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


























