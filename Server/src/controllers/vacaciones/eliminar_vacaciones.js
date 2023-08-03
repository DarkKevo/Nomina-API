import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const EliminarVacaciones = (id) => {
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

  let verify = 'SELECT * FROM nomina_database.vacaciones where `id_empleado`= ' + `'${id}'`;

  let DELETE = 'DELETE FROM nomina_database.vacaciones where `id_empleado`= ' + `'${id}'`;

  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
    } else {
      if (result.length != 0) {
        conexion.query(DELETE, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
          } else {
            console.log(results);
            conexion.end();
          }
        });
      } else {
        console.log('No existe el registro');
        conexion.end();
      }
    }
  });
};
