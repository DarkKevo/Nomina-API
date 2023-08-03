import mysql from "mysql2";

import { host, port, username, password } from "../../Config/MySqlConfig.js";

export const UsarVacaciones = (req, res) => {
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

  const { usar, id_empleado } = req.body;

  let verify =
    "SELECT * FROM nomina_database.vacaciones where `id_empleado`= " +
    `'${id_empleado}'`;

  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        if (usar > result[0].vacaciones_acumuladas) {
          console.log("No tiene dias suficiientes");
          res.sendStatus(400);
        } else {
          let suma = result[0].vacaciones_usadas;
          const acu = suma + usar;
          let update =
            "UPDATE nomina_database.vacaciones SET `vacaciones_usadas`= " +
            `${acu}` +
            " where `id_empleado`= " +
            `${id_empleado}`;
          conexion.query(update, (err, results) => {
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
        }
      } else {
        console.log("No existe el registro");
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
