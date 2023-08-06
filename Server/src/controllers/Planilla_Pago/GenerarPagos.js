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
        "INSERT INTO `nomina_database`.`respaldo_pagos` (`nombre`, `cargo`, `cuenta`, `pagoDiasLaborales`, `pagoDiasExtras`, `pagoDiasDescanso`, `pagoTotal`, `idEmpleado`, `fecha`) VALUES" +
        `('${element.nombre}', '${element.cargo}', '${element.cuenta}', '${element.pago_de_dias_laborales}', '${element.pago_de_dias_extras}', '${element.pago_dias_de_descanso}', '${element.pago_correspondiente_total}', '${element.idEmpleados}', '${element.fecha}')`;

      conexion.query(backup, (err, res) => {
        if (err) {
          console.log(err);
          res.status(400);
          conexion.end();
        } else {
          resetRegistros(array);
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
          }
        });
      }
    });
  }

  function Calculo(array) {
    let cont_day =
      "SELECT MAX(fecha), MIN(fecha) FROM nomina_database.registro_horas";
    conexion.query(cont_day, (err, r_cd) => {
      if (err) {
        console.log(err);
        res.status(400);
        conexion.end();
      } else if (r_cd.length == 0) {
        console.log(r_cd);
        res.status(400).send({ error: "No hay dias registrados para pagar" });
        conexion.end();
      } else {
        const fecha1 = fecha_corta(r_cd.fecha_minima);
        const fecha2 = fecha_corta(r_cd.fecha_maxima);
        const diferencia = fecha1 - fecha2;
        const numeroDias = diferencia / (1000 * 60 * 60 * 24);
        if (numeroDias < 14) {
          console.log(numeroDias);
          res.status(400).send({ error: "No hay suficientes dias para pagar (15)" });
          conexion.end();
        }
        array.forEach((element, index) => {
          let days = `SELECT * FROM nomina_database.registro_horas WHERE idEmpleados = ${element.idEmpleados} and horas_extras > 0 or horas_laboradas > 0`;
          conexion.query(days, (err, resultado) => {
            if (err) {
              console.log(err);
              res.status(400);
              conexion.end();
            } else if (resultado.length == 0) {
              console.log(resultado);
              console.log("El Empleado no tiene horas" );
              conexion.end();
            } else {
              console.log(element);

              let salario_diario = element.salario / 30;
              let salario_hora = salario_diario / 9;
              let salario_dias_trabajados =
                element.horas_trabajadas * salario_hora;
              let salarios_dias_descanso = 4 * salario_diario;
              let Salario_horas_extra =
                salario_hora * 1.5 * element.horas_extras;
              let monto_base = salario_dias_trabajados + salarios_dias_descanso;

              let suma_bonificaciones = 0;
              let suma_deducciones = 0;
              let Historial_B = `SELECT * FROM nomina_database.historialbonificacion WHERE idEmpleados = ${element.idEmpleados}`;
              let Historial_D = `SELECT * FROM nomina_database.historialdeducciones WHERE idEmpleados = ${element.idEmpleados}`;
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
                idEmpleados: element.idEmpleados,
                nombre: `${element.nombres} ${element.apellidos}`,
                departamento: e.departamento,
                cargo: element.cargo,
                cuenta: element.numero_cuenta,
                correo: element.correo,
                dias: resultado.length,
                dias_descanso: 4,
                fechas: `${fecha1} al ${fecha2}`,
                horas_trabajadas: element.horas_trabajadas,
                monto_base: monto_base,
                horas_extras: element.horas_extras,
                monto_extra: Salario_horas_extra,
                monto_deduccion: suma_deducciones,
                monto_bonificacion: suma_bonificaciones,
                pagoTotal: total,
                fecha_pago: hoy
              });
              if (index == array.length - 1) {
                respaldo(data_pagos);       
              }
            }
          });
        });
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
