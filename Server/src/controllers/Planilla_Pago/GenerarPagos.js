import mysql from "mysql2";

import { host, port, username, password } from "../../Config/MySqlConfig.js";

export const GenerarPagos = (req, res) => {
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
  let monto_nomina = 0;

  let query = "SELECT * FROM nomina_database.pre_pagos";

  function date_short(dateString) {
    const date = new Date(String(dateString));
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
  }

  function GuardarNominna(monto_nomina,fecha_inicial,fecha_final) {
    let save =
      "INSERT INTO `nomina_database`.`historial_de_nomina` (`fecha_inicial`,`fecha_final`,`monto_nomina`) VALUES ";

    save += `('${fecha_inicial}', '${fecha_final} ', '${monto_nomina}')`;

    conexion.query(save, (err, res) => {
      if (err) {
        console.log(err);
        conexion.end();
      } else {
        console.log("Nomina Insertada")
      }
    });
  }

  function resetRegistros(monto_nomina,fecha_inicial,fecha_final) {
    let reset = `DELETE FROM nomina_database.registro_horas;`;

    conexion.query(reset, (err, res) => {
      if (err) {
        console.log(err);
        conexion.end();
      } else {
        GuardarNominna(monto_nomina,fecha_inicial,fecha_final);
      }
    });
  }

  function resetPreNomina(monto_nomina,fecha_inicial,fecha_final) {
    let reset = `DELETE FROM nomina_database.pre_pagos`;

    conexion.query(reset, (err, res) => {
      if (err) {
        console.log(err);
        conexion.end();
      } else {
        resetRegistros(monto_nomina,fecha_inicial,fecha_final);
      }
    });
  }

  function respaldo(array) {
    array.forEach((element, index) => {
      let backup =
        "INSERT INTO nomina_database.respaldo_pagos (`id_pagos`,`idEmpleado`,`cedula`,`nombre`,`departamento`, `cargo`, `cuenta`,`correo`,`dias`,`fecha_ini`,`fecha_cul`,`horas_trabajadas`,`monto_base`, `horas_extras`, `monto_extra`, `monto_deduccion`, `monto_bonificacion`, `pagoTotal`, `fecha_pago`) VALUES" +
        `(${element.idEmpleado},${element.idEmpleado}, '${element.cedula}', '${
          element.nombre
        }', '${element.departamento}', '${element.cargo}', '${
          element.cuenta
        }', '${element.correo}', ${element.dias}, '${date_short(
          element.fecha_ini
        )}', '${date_short(element.fecha_cul)}', ${element.horas_trabajadas}, ${
          element.monto_base
        }, ${element.horas_extras}, ${element.monto_extra}, ${
          element.monto_deduccion
        }, ${element.monto_bonificacion}, ${element.pagoTotal}, '${date_short(
          element.fecha_pago
        )}')`;

      conexion.query(backup, (err, res) => {
        if (err) {
          console.log(err);
          console.log({ error: "Error al guardar datos" });
          conexion.end();
        } else {
          monto_nomina += element.pagoTotal;
          if (index == array.length - 1) {
            resetPreNomina(monto_nomina, date_short(element.fecha_ini),date_short(element.fecha_cul));
          }
        }
      });
    });
  }

  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400);
      conexion.end();
    } else if (result.length == 0) {
      console.log(result);
      res.status(400).send({
        error: "No hay una Pre-Nomina generada",
      });
      conexion.end();
    } else {
      respaldo(result);
      res.status(200).send({ message: "Empleados Pagados" });
    }
  });
};
