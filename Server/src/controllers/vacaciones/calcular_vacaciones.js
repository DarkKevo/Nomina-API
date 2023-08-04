import mysql from "mysql2";

import { host, port, username, password } from "../../Config/MySqlConfig.js";

export const CalcularVacaciones = () => {
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

  let verify = "SELECT * FROM nomina_database.vacaciones";
  let select_id =
    "SELECT idEmpleados, antiguedad FROM nomina_database.empleados";
  const fecha = new Date();
  const hoy =
    `${fecha.getFullYear()}-` +
    `${fecha.getMonth() + 1}-` +
    `${fecha.getDate()}`;

  const dias_vac = 365 / 14;
  //Verificando la existencia del cargo
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
    } else {
      if (result.length != 0) {
        conexion.query(select_id, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
          } else {
            results.forEach((element, index) => {
              let verify2 =
                "SELECT vacaciones_usadas FROM nomina_database.vacaciones where id_empleado = " +
                `${element.idEmpleados}`;
              conexion.query(verify2, (err, results3) => {
                if (err) {
                  console.log(err);
                  conexion.end();
                } else {
                  const fecha_a = new Date(element.antiguedad);
                  const f =
                    `${fecha_a.getFullYear()}-` +
                    `${fecha_a.getMonth() + 1}-` +
                    `${fecha_a.getDate()}`;

                  const fecha1 = new Date(hoy);
                  const fecha2 = new Date(f);

                  const diferencia = fecha1 - fecha2;

                  const numeroDias = diferencia / (1000 * 60 * 60 * 24);

                  let vacaciones = Math.trunc(numeroDias / dias_vac);
                  let usados = results3[0].vacaciones_usadas;
                  let vacaciones_acumuladas = parseInt(vacaciones) - parseInt(usados);

                  const a_c = Math.trunc((vacaciones_acumuladas*dias_vac)/365);
                    if (a_c>1) {
                        vacaciones_acumuladas += (a_c-1)
                    }
                    if (vacaciones_acumuladas<0) {
                      vacaciones_acumuladas = 0
                    }

                  let update =
                    `UPDATE nomina_database.vacaciones SET vacaciones_acumuladas= ${vacaciones_acumuladas} where id_empleado= ${element.idEmpleados}`;
                  conexion.query(update, (err, results2) => {
                    if (err) {
                      console.log(err);
                      conexion.end();
                    }
                  });

                  if (index == results.length - 1) {
                    conexion.end();
                    console.log("calculado");
                  }
                }
              });
            });
          }
        });
      } else {
        console.log("No hay datos");
        conexion.end();
      }
    }
  });
};
