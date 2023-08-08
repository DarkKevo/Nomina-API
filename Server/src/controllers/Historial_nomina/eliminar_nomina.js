import mysql from "mysql2";

import { host, port, username, password } from "../../Config/MySqlConfig.js";

export const EliminarNomina = (req, res) => {
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

  const { id_nomina, fecha_ini, fecha_cul } = req.body;

  let verify =
    "SELECT * FROM nomina_database.historial_de_nomina where `id_nomina`= " +
    `'${id_nomina}'`;

  let DELETE =
    "DELETE FROM nomina_database.historial_de_nomina where `id_nomina`= " +
    `'${id_nomina}'`;
  let DELETE2 = `DELETE FROM nomina_database.respaldo_pagos where fecha_ini = '${fecha_ini}' and fecha_cul = '${fecha_cul}'`;

  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        conexion.query(DELETE2, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            conexion.query(DELETE, (err, resul) => {
              if (err) {
                console.log(err);
                conexion.end();
                res.sendStatus(400);
              } else {
                conexion.end();
                res.sendStatus(200);
              }
            });
          }
        });
      } else {
        console.log("No existe la nomina");
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
