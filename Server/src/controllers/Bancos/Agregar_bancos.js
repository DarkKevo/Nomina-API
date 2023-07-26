import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const CrearBanco = (req, res) => {
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

  const {idbancos, codigo, nombre, cuenta } = req.body;

  let verify = 'SELECT * FROM nomina_database.Bancos where `idbancos`= ' + `'${idbancos}'`;

  let query = 'INSERT INTO `nomina_database`.`bancos` (`codigo`, `nombre`, `cuenta`) VALUES ';

  query += `('${codigo}', '${nombre}', '${cuenta}')`;

  //Verificando la existencia de la Deduccion
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length == 0) {
        //Creando la Deduccion
        conexion.query(query, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Agregando la Deduccion
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('Ya existe la Deduccion');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
