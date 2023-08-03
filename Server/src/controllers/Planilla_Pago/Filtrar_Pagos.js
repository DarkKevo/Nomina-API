import mysql from "mysql2";

import { host, port, username, password } from "../../Config/MySqlConfig.js";

export const FiltrarPagos = (req, res) => {
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

  const { cedula } = req.body;

  let query =
    "SELECT idEmpleados FROM nomina_database.empleados where cedula = " +
    `${cedula}`;
  let consulta =
    "SELECT * FROM nomina_database.respaldo_pagos where idEmpleado = ";

  //Verificando la existencia de los cargos
  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else if (result.length == 0) {
      //La Tabla de cargos no tiene datos
      console.log(result);
      conexion.end();
      res.status(400).send({ error: "no hay datos" });
    } else {
      consulta += result[0].idEmpleados;
      conexion.query(consulta, (err, results) => {
        if (err) {
          console.log(err);
          conexion.end();
          res.sendStatus(400);
        } else if (results.length == 0) {
          //La Tabla de cargos no tiene datos
          console.log(results);
          conexion.end();
          res.status(400).send({ error: "no hay datos" });
        } else {
          //Cargos Listados
          conexion.end();
          res.send(results);
        }
      });
    }
  });
};