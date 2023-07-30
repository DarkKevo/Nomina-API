import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const BuscarCargo = (req, res) => {
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
  
  const { codigo_cargo } = req.body;

  let query =
  `SELECT salario FROM nomina_database.cargos WHERE cargo = "${codigo_cargo}"` 

  //Verificando la existencia de los cargos
  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else if (result.length == 0) {
      //La Tabla de cargo no tiene datos
      console.log(result);
      conexion.end();
      res.sendStatus(400);
    } else {
      //cargo Listados
      conexion.end();
      res.send(result[0]);
    }
  });
};
