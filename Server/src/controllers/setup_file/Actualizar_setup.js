import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const ActualizarSetup = (req, res) => {
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



  const { idfile, idbancos, tipo_file, columnasfile ,separadores } = req.body;
  
  let verify = 'SELECT * FROM nomina_database.setup_banco_file where `idfile`= ' + `'${idfile}'`;

  let update =
    'UPDATE nomina_database.setup_banco_file SET `idbancos`= ' +
    `'${idbancos}', ` +
       '`tipo_file`= ' +
    `'${tipo_file}',`  +
    '`columnasfile`= ' +
    `'${columnasfile}',` +
    '`separadores`= ' +
    `'${separadores}' ` +
    ' where `idfile`= ' +
    `'${idfile}'`;

  //Verificando la existencia del Setup
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Actualizando el Setup
        conexion.query(update, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Setup Actualizado
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
