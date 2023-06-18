import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const EliminarSalario = (req, res) => {
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

  const { idsalario } = req.body;

  let verify = 'SELECT * FROM nomina_database.salario where `idsalario`= ' + `'${idsalario}'`;

  let DELETE = 'DELETE FROM nomina_database.salario where `idsalario`= ' + `'${idsalario}'`;

  //Verificando la existencia del salario
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Eliminando el salario
        conexion.query(DELETE, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Salario Eliminado
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe el salario');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
