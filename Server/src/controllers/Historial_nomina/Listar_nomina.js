import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const Listarnomina = (req, res) => {
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

  let query =  `SELECT 
  id_nomina
  ,date_format(fecha_inicial, "%Y-%m-%d") fecha_inicial
  ,date_format(fecha_final, "%Y-%m-%d") fecha_final
  ,monto_nomina 
FROM nomina_database.historial_de_nomina`;

  //Verificando la existencia de la nomina
  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else if (result.length == 0) {
      //La Tabla de nomina no tiene datos
      console.log(result);
      conexion.end();
      res.status(400).send({error:'no hay datos'})
    } else {
      //nomina Listados
      conexion.end();
      res.send(result);
    }
  });
};