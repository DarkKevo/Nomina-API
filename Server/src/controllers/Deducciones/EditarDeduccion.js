import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const ActualizarDeduccion = (req, res) => {
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

  const { iddeducciones, monto, descripcion } = req.body;

  let verify = 'SELECT * FROM nomina_database.deducciones where `iddeducciones`= ' + `'${iddeducciones}'`;

  let update =
    'UPDATE nomina_database.deducciones SET `monto`= ' +
    `'${monto}', ` +
    '`descripcion`= ' +
    `'${descripcion}'` +
    'where `iddeducciones`= ' +
    `'${iddeducciones}'`;

  //Verificando la existencia de la Deduccion
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Actualizando la Deduccion
        conexion.query(update, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Deduccion Actualizado
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe la Deduccion');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
