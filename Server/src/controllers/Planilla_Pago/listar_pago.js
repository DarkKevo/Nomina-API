import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';
import { paginate } from '../Pagination/Pagination.js';

export const ListarPago = (req, res) => {
  let pagina = parseInt(req.query.page);
  let limite = parseInt(req.query.limit);

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

  let query = 'SELECT * FROM nomina_database.respaldo_pagos;';

  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else if (result.length == 0) {
      console.log(result);
      conexion.end();
      res.status(400).send({ error: 'no hay datos' });
    } else {
      conexion.end();
      res.send(paginate(result, pagina, limite));
    }
  });
};
