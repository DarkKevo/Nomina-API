import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const editarBonificacion = (req, res) => {
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

  const { idbonificaciones, descripcion, monto } = req.body;

  let verify = 'SELECT * FROM nomina_database.bonificaciones where `idbonificaciones`= ' + `'${idbonificaciones}'`;

  let update =
    'UPDATE nomina_database.bonificaciones SET `monto_bonificacion`= ' +
    `'${monto}', ` +
    '`descripcion_bonificacion`= ' +
    `'${descripcion}'` +
    'where `idbonificaciones`= ' +
    `'${idbonificaciones}'`;

  //Verificando la existencia de la Bonificacion
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Actualizando la Bonificacion
        conexion.query(update, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Bonificacion Actualizado
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe la Bonificacion');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
