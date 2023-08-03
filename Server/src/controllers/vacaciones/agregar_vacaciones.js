import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const AgregarVacaciones = (id_empleado, nombres, apellidos) => {
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

  let verify = 'SELECT * FROM nomina_database.vacaciones where `id_empleado`= ' + `'${id_empleado}'`;

  let query = 'INSERT INTO `nomina_database`.`vacaciones` (`id_empleado`, `nombres`, `apellidos`, `vacaciones_acumuladas`, `vacaciones_usadas`) VALUES ';

  query += `(${id_empleado},` + ` '${nombres}',` + ` '${apellidos}',` + ` ${0},` + ` ${0})`;

  //Verificando la existencia del cargo
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
    } else {
      if (result.length == 0) {
        //Agregando el Cargo
        conexion.query(query, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
          } else {
            console.log(results);
            conexion.end();
          }
        });
      }else {
        console.log('Ya existe las vacaciones');
        conexion.end();
      }
    }
  });
};
