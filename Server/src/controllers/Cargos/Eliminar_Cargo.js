import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const EliminarCargo = (req, res) => {
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

  const { idcargos } = req.body;

  let verify = 'SELECT * FROM nomina_database.cargos where `idcargos`= ' + `'${idcargos}'`;

  let DELETE = 'DELETE FROM nomina_database.cargos where `idcargos`= ' + `'${idcargos}'`;

  //Verificando la existencia del cargo
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Eliminando el cargo
        conexion.query(DELETE, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Cargo Eliminado
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe el cargo');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
