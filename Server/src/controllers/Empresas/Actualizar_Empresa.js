import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const ActualizarEmpresa = (req, res) => {
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

  const { idEmpresas, rif, nombre, direccion, telefono, correo } = req.body;

  let verify = 'SELECT * FROM nomina_database.Empresas where `idEmpresas`= ' + `'${idEmpresas}'`;

  let update =
    'UPDATE nomina_database.Empresas SET `rif`= ' +
    `'${rif}'` +
    ',`nombre`= ' +
    `'${nombre}'` +
    ', `direccion`= ' +
    `'${direccion}'` +
    ', `telefono`= ' +
    `'${telefono}'` +
    ', `correo`= ' +
    `'${correo}'` +
    'where `idEmpresas`= ' +
    `'${idEmpresas}'`;

  //Verificando la existencia del la empresa
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Actualizando la empresa
        conexion.query(update, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Empresa Actualizado
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe el empleado');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
