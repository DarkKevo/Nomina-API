import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const Agregarsetup = (req, res) => {
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

  const {idfile, idbancos, separadores, tipo_file, columnasfile } = req.body;

  let verify = 'SELECT * FROM nomina_database.setup_banco_file where `idfile`= ' + `'${idfile}'`;

  let query = 'INSERT INTO `nomina_database`.`setup_banco_file` (`idbancos`, `separadores`, `tipo_file`, `columnasfile`) VALUES ';

  query += `('${idbancos}', '${separadores}', '${tipo_file}', '${columnasfile}')`;

  //Verificando la existencia del Setup
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length == 0) {
        //Creando el Setup
        conexion.query(query, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Agregando el Setup
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('Ya existe el Setup');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
