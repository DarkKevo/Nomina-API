import mysql from 'mysql2';
import bcrypt from 'bcrypt';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

import { SaltRounds } from '../../index.js';

export const CrearEmpresa = (req, res) => {
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

  const { rif, nombre, direccion, telefono, correo, clave } = req.body;

  var password_encriptada = bcrypt.hashSync(clave, parseInt(SaltRounds));

  let verify = 'SELECT * FROM nomina_database.Empresas where `nombre`= ' + `'${nombre}'`;

  let query = 'INSERT INTO `nomina_database`.`Empresas` (`rif`, `nombre`, `direccion` , `telefono` , `correo` , `password`) VALUES ';

  query += `('${rif}', '${nombre}', '${direccion}', '${telefono}', '${correo}', '${password_encriptada}')`;

  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length == 0) {
        conexion.query(query, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
