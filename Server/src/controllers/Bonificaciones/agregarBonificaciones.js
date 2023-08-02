import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const agregarBonificacion = (req, res) => {
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

  const { descripcion, monto } = req.body;

  let verify = 'SELECT * FROM nomina_database.bonificaciones where `descripcion`= ' + `'${descripcion}'`;

  let query = 'INSERT INTO `nomina_database`.`bonificaciones` (`descripcion_bonificacion`, `monto_bonificacion`) VALUES ';

  query += `('${descripcion}', '${monto}')`;

  //Verificando la existencia de la descripcion
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length == 0) {
        //Creando la Bonificacion
        conexion.query(query, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Agregando la Bonificacion
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('Ya existe la Bonificacion');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
