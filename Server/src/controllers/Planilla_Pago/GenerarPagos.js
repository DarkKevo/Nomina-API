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
    array.forEach((element, index) => {
      let days = `SELECT * FROM nomina_database.registro_horas WHERE idEmpleados = ${element.idEmpleados} and horas_extras > 0 or horas_laboradas > 0`;
      conexion.query(days, (err, resultado) => {
        if (err) {
          console.log(err);
          res.status(400);
          conexion.end();
        } else if (resultado.length == 0) {
          console.log(resultado);
          res.status(400).send({error:'Los Empleados no tiene horas'})
          conexion.end();
        } else {
          console.log(resultado)
          
          // let salario_diario = element.salario / 30;
          // let dias_laborados = resultado.length * salario_diario;
          // let dias_descanso = 4 * salario_diario;
          // let dias_extra = salario_diario * 1.5 * resultado2.length;
          // let fecha = new Date();
          // data_pagos.push({
          //   idEmpleados: element.idEmpleados,
          //   fecha: `${fecha.getFullYear()}/${fecha.getMonth()}/${fecha.getDate()}`,
          //   nombre: `${element.nombres} ${element.apellidos}`,
          //   cargo: element.cargo,
          //   cuenta: element.numero_cuenta,
          //   pago_de_dias_laborales: dias_laborados,
          //   pago_de_dias_extras: dias_extra,
          //   pago_dias_de_descanso: dias_descanso,
          //   deduccion: element.descripcion_deduccion,
          //   deduccion_monto: element.monto_deduccion,
          //   bonificacion: element.descripcion_bonificacion,
          //   bonificacion_monto: element.monto_bonificacion,
          //   pago_correspondiente_total:
          //     dias_laborados +
          //     dias_extra +
          //     dias_descanso +
          //     element.monto_bonificacion -
          //     element.monto_deduccion,
          // });
          // if (index == array.length - 1) {
          //   respaldo(data_pagos);
          //   res.json(data_pagos);
          // }
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
      res.status(400).send({error:'no hay datos de empleados'})
      conexion.end();
    } else {
      Calculo(result);
    }
  });
};
