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

  let query =
    "SELECT * FROM nomina_database.empleados inner join nomina_database.cargos on (empleados.codigo_cargo = cargos.idcargos) inner join nomina_database.departamentos on (empleados.codigo_departamento = departamentos.iddepartamentos) where empleados.estado = 'activo'";

  var data_pagos = [];

  const fecha_corta = (f) => {
    const fecha = new Date(f);
    const fecha_c =
      `${fecha.getFullYear()}-` +
      `${fecha.getMonth() + 1}-` +
      `${fecha.getDate()}`;
    return fecha_c;
  };

  function respaldo(array) {
    array.forEach((element) => {
      let backup =
        "INSERT INTO `nomina_database`.`respaldo_pagos` (`idEmpleado`,`nombre`,`departamento`, `cargo`, `cuenta`,`correo`,`dias`,`dias_descanso`,`fechas`,`horas_trabajadas`,`monto_base`, `horas_extras`, `monto_extra`, `monto_deduccion`, `monto_bonificacion`, `pagoTotal`, `fecha_pago`) VALUES" +
        `(${element.idEmpleado}, '${element.nombre}', '${element.departamento}', '${element.cargo}', '${element.cuenta}', '${element.correo}', '${element.dias}', '${element.dias_descanso}', '${element.fechas}', '${element.horas_trabajadas}', '${element.monto_base}', '${element.horas_extras}', '${element.monto_extra}', '${element.monto_deduccion}', '${element.monto_bonificacion}', '${element.pagoTotal}', '${element.fecha_pago}')`;

      conexion.query(backup, (err, res) => {
        if (err) {
          console.log(err);
          res.status(400);
          conexion.end();
        } else {
          // resetRegistros(array);
        }
      });
    });
  }

  function resetRegistros(array) {
    let resetRegistros = `DELETE FROM nomina_database.registro_horas;`;
    let resetHoras = `UPDATE nomina_database.empleados set horas_trabajadas = 0, horas_extras = 0;`;

    conexion.query(resetRegistros, (err, res) => {
      if (err) {
        console.log(err);
        conexion.end();
      } else {
        conexion.query(resetHoras, (err, res2) => {
          if (err) {
            console.log(err);
            conexion.end();
          } else {
            conexion.end();
            res.status(200).send({ message: "Empleados Pagados" });
          }
        });
      }
    });
  }

  function Calculo(array) {
    let cont_day =
      "SELECT MAX(fecha) as fecha_maxima, MIN(fecha) as fecha_minima FROM nomina_database.registro_horas";
    conexion.query(cont_day, (err, r_cd) => {
      if (err) {
        console.log(err);
        res.status(400);
        conexion.end();
      } else if (r_cd[0].fecha_maxima == null && r_cd[0].fecha_minima == null) {
        console.log(r_cd);
        res.status(400).send({ error: "No hay dias registrados para pagar" });
        conexion.end();
      } else {
        const fecha1 = new Date(fecha_corta(r_cd[0].fecha_maxima));
        const fecha2 = new Date(fecha_corta(r_cd[0].fecha_minima));
        const diferencia = fecha1 - fecha2;
        const numeroDias = diferencia / (1000 * 60 * 60 * 24);
        if ((numeroDias+2) < 14) {
          res.status(400).send({
            error:
              "No hay suficientes dias para pagar (15) - " + `${numeroDias + 2}`,
          });
          conexion.end();
        } else {
          array.forEach((element, index) => {
            let days = `SELECT * FROM nomina_database.registro_horas WHERE idEmpleados = ${element.idEmpleados} and horas_extras > 0 or horas_laboradas > 0`;
            conexion.query(days, (err, resultado) => {
              if (err) {
                console.log(err);
                res.status(400);
                conexion.end();
              } else if (resultado.length == 0) {
                console.log(resultado);
                console.log("El Empleado no tiene horas");
                conexion.end();
              } else {
                let salario_diario = element.salario / 30;
                let salario_hora = salario_diario / 9;
                let salario_dias_trabajados =
                  element.horas_trabajadas * salario_hora;
                let salarios_dias_descanso = 4 * salario_diario;
                let Salario_horas_extra =
                  salario_hora * 1.5 * element.horas_extras;
                let monto_base =
                  salario_dias_trabajados + salarios_dias_descanso;
                console.log(element.salario,salario_diario,salario_hora,salario_dias_trabajados,salarios_dias_descanso,Salario_horas_extra,monto_base)
                let suma_bonificaciones = 0;
                let suma_deducciones = 0;
                let Historial_B = `SELECT * FROM nomina_database.historialbonificacion WHERE id_empleado = ${element.idEmpleados}`;
                let Historial_D = `SELECT * FROM nomina_database.historialdeducciones WHERE id_empleado = ${element.idEmpleados}`;
                conexion.query(Historial_B, (err, r_b) => {
                  if (err) {
                    console.log(err);
                    res.status(400);
                    conexion.end();
                  } else if (r_b.length == 0) {
                    console.log("No tiene bonificaciones");
                    conexion.end();
                  } else {
                    r_b.forEach((e, i) => {
                      let bonificacion =
                        "SELECT * FROM nomina_database.bonificaciones where descripcion_bonificacion = " +
                        `'${e.bonificacion}'`;
                      conexion.query(bonificacion, (err, r_bon) => {
                        if (err) {
                          console.log(err);
                          res.status(400);
                          conexion.end();
                        } else {
                          suma_bonificaciones += r_bon[0].monto_bonificacion;
                        }
                      });
                    });
                  }
                });
                conexion.query(Historial_D, (err, r_d) => {
                  if (err) {
                    console.log(err);
                    res.status(400);
                    conexion.end();
                  } else if (r_d.length == 0) {
                    console.log("No tiene Deducciones");
                    conexion.end();
                  } else {
                    r_d.forEach((e2, i) => {
                      let deduccion =
                        "SELECT * FROM nomina_database.deducciones where descripcion_deduccion = " +
                        `'${e2.deducciones}'`;
                      conexion.query(deduccion, (err, r_dec) => {
                        if (err) {
                          console.log(err);
                          res.status(400);
                          conexion.end();
                        } else {
                          suma_deducciones += r_dec[0].monto_deduccion;
                        }
                      });
                    });
                  }
                });
                let total =
                  monto_base +
                  Salario_horas_extra +
                  suma_bonificaciones -
                  suma_deducciones;
                let fecha = new Date();
                let hoy = fecha_corta(fecha);

                data_pagos.push({
                  idEmpleado: element.idEmpleados,
                  nombre: `${element.nombres} ${element.apellidos}`,
                  departamento: element.departamento,
                  cargo: element.cargo,
                  cuenta: element.numero_cuenta,
                  correo: element.correo,
                  dias: resultado.length,
                  dias_descanso: 4,
                  fechas: `${fecha_corta(fecha2)} al ${fecha_corta(fecha1)} `,
                  horas_trabajadas: element.horas_trabajadas,
                  monto_base: monto_base,
                  horas_extras: element.horas_extras,
                  monto_extra: Salario_horas_extra,
                  monto_deduccion: suma_deducciones,
                  monto_bonificacion: suma_bonificaciones,
                  pagoTotal: total,
                  fecha_pago: hoy,
                });
                if (index == array.length - 1) {
                  respaldo(data_pagos);
                }
              }
            });
          });
        }
      }
    });
  }

  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400);
      conexion.end();
    } else if (result.length == 0) {
      console.log(result);
      res.status(400).send({ error: "no hay datos de empleados" });
      conexion.end();
    } else {
      Calculo(result);
    }
  });
};
