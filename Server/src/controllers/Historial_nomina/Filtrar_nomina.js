import mysql from "mysql2";

import { host, port, username, password } from "../../Config/MySqlConfig.js";

export const FiltrarNomina = (req, res) => {
  var conexion = mysql.createConnection({
    host: host,
    port: port,
    user: username,
    password: password,
    multipleStatements: true,
  });

  conexion.connect(function (err) {
    if (err) {
      console.error("Error de conexion: " + err.stack);
      return;
    }
  });

  const { fecha_ini, fecha_cul } = req.body;

  let Nomina = `SELECT * FROM nomina_database.respaldo_pagos where fecha_ini = '${fecha_ini}' and fecha_cul = '${fecha_cul}'`;

  conexion.query(Nomina, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        conexion.end();
        res.send(result);
      } else {
        console.log("No existe la nomina");
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
