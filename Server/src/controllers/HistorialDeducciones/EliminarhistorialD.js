import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const EliminarHistoriald = (req, res) => {
  var conexion = mysql.createConnection({
    host: host,
    port: port,
    user: username,
    password: password,
    multipleStatements: true,
  });

  conexion.connect(function (err) {
    if (err) {
      console.error('Error de conexion: ' + err.stack);
      return;
    }
  });

  const { id_d } = req.body;

  let verify = 'SELECT * FROM nomina_database.historialDeducciones where `id_d`= ' + `'${id_d}'`;

  let DELETE = 'DELETE FROM nomina_database.historialDeducciones where `id_d`= ' + `'${id_d}'`;

  //Verificando la existencia del Setup
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Eliminando el Setup
        conexion.query(DELETE, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Setup Eliminado
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe el Setup');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
