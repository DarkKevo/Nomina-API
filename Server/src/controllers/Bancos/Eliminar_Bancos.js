import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const EliminarBancos = (req, res) => {
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

  const { idbancos } = req.body;

  let verify = 'SELECT * FROM nomina_database.Bancos where `idbancos`= ' + `'${idbancos}'`;

  let DELETE = 'DELETE FROM nomina_database.Bancos where `idbancos`= ' + `'${idbancos}'`;

  //Verificando la existencia del Banco
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Eliminando el Banco
        conexion.query(DELETE, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Banco Eliminado
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe la Banco');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
