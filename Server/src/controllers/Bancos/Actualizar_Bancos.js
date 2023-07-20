import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const ActualizaBanco = (req, res) => {
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

  const { idbancos, codigo, nombre, cuenta } = req.body;

  let verify = 'SELECT * FROM nomina_database.bancos where `idbancos`= ' + `'${idbancos}'`;

  let update =
    'UPDATE nomina_database.bancos SET `codigo`= ' +
    `'${codigo}', ` +
    '`nombre`= ' +
    `'${nombre}',` +
    '`cuenta`= ' +
    `'${cuenta}'` +
    ' where `idbancos`= ' +
    `'${idbancos}'`;

  //Verificando la existencia del Banco
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Actualizando el Banco
        conexion.query(update, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Banco Actualizado
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe el Banco');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
